
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useGroupStore } from "../store/useGroupStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useCallStore } from "../store/useCallStore";
import { io } from "socket.io-client";
import { motion } from "framer-motion";

const ChatContainer = () => {
  const {
    selectedUser,
    messages: userMessages,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    isMessagesLoading: isUserMessagesLoading,
  } = useChatStore();

  const {
    selectedGroup,
    messages: groupMessages,
    getGroupMessages,
    subscribeToGroupMessages,
    unsubscribeFromGroupMessages,
    isMessagesLoading: isGroupMessagesLoading,
  } = useGroupStore();

  const { authUser } = useAuthStore();
  const { startCall } = useCallStore();
  const navigate = useNavigate();

  const [incomingCall, setIncomingCall] = useState(false);
  const [callerId, setCallerId] = useState(null);
  const socketRef = useRef(null);



  const messageEndRef = useRef(null);

  const isGroupChat = !!selectedGroup;
  const isUserChat = !!selectedUser;

  // ✅ Establish socket connection once
  useEffect(() => {

    //this is the problem , you are creating a new socket instance every time the component mounts
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5001");
    }


    if (authUser) {
      socketRef.current.emit("join-call", { userId: authUser._id });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [authUser]);

  // ✅ Handle incoming call
  useEffect(() => {
    const socket = socketRef.current;
    if (!authUser || !socket) return;

    const handleIncomingCall = ({ from }) => {
      // from=callerId;
      if (isUserChat && selectedUser?._id === from) {
        setIncomingCall(true);
        setCallerId(from);
      }

      if (isUserChat) {
        setIncomingCall(true);
        setCallerId(from);
      }
    };

    socket.on("incoming-call", handleIncomingCall);
    return () => {
      socket.off("incoming-call", handleIncomingCall);
    };
  }, [authUser, selectedUser?._id, isUserChat]);

  const handleAccept = () => {
    if (!callerId) return;
    setIncomingCall(false);
    socketRef.current.emit("accept-call", { from: callerId });
    startCall({ user: selectedUser, isCaller: false });
    navigate(`/call/${callerId}`);
  };

  const handleDecline = () => {
    if (!callerId) return;
    setIncomingCall(false);
    socketRef.current.emit("decline-call", { from: callerId });
  };

  useEffect(() => {
    if (isUserChat) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    } else if (isGroupChat) {
      getGroupMessages(selectedGroup._id);
      subscribeToGroupMessages();
      return () => unsubscribeFromGroupMessages();
    }
  }, [selectedUser, selectedGroup]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages, groupMessages]);

  const messages = isGroupChat ? groupMessages : userMessages;
  const isLoading = isGroupChat ? isGroupMessagesLoading : isUserMessagesLoading;

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader socket={socketRef.current} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  // console.log(incomingCall);
  // console.log(isUserChat);
  // console.log(callerId);
  // console.log(from);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader socket={socketRef.current} />

      {incomingCall && isUserChat && (
        <div className="p-4 bg-yellow-100 flex justify-center gap-4">
          <button onClick={handleAccept} className="btn btn-success">Accept</button>
          <button onClick={handleDecline} className="btn btn-error">Decline</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const senderId = isGroupChat ? msg.sender?._id : msg.senderId;
          const isOwn = senderId === authUser._id;
          const text = isGroupChat ? msg.content : msg.text;
          const image = isGroupChat ? msg.imageUrl : msg.image;

          return (
            <div
              key={msg._id}
              className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isOwn
                        ? authUser.profilePic || "/avatar.png"
                        : isGroupChat
                          ? msg.sender?.profilePic || "/avatar.png"
                          : selectedUser?.profilePic || "/avatar.png"
                    }
                    alt="profile"
                  />
                </div>
              </div>

              <div className="chat-header mb-1">
                {isGroupChat && !isOwn && (
                  <span className="text-xs text-zinc-400 font-semibold mr-1">
                    {msg.sender?.fullName || "User"}
                  </span>
                )}
                <time className="text-xs opacity-50">
                  {isGroupChat
                    ? formatMessageTime(msg.timestamp)  
                    : formatMessageTime(msg.createdAt)} 
                </time>

              </div>

              <div
                className={`chat-bubble flex flex-col ${isOwn ? "bg-blue-500 text-white" : "bg-base-300"
                  }`}
              >
                {image && (
                  <img
                    src={image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {text && <p>{text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;




