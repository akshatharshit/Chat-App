// import { useChatStore } from "../store/useChatStore";
// import { useGroupStore } from "../store/useGroupStore";
// import { useAuthStore } from "../store/useAuthStore";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ChatHeader = () => {
//   const navigate = useNavigate();
//   const { selectedUser, setSelectedUser } = useChatStore();
//   const { selectedGroup, setSelectedGroup, getGroupDetails } = useGroupStore();
//   const { authUser } = useAuthStore();

//   const clearChat = () => {
//     setSelectedUser(null);
//     setSelectedGroup(null);
//   };

//   const handleGroupClick = async () => {
//     if (!selectedGroup?._id) return;
//     await getGroupDetails(selectedGroup._id); // fetch full data
//     navigate(`/group/${selectedGroup._id}`);
//   };

//   if (!selectedUser && !selectedGroup) {
//     return (
//       <div className="p-4 border-b border-base-300 flex justify-between items-center">
//         <p className="text-base-content text-sm">No chat selected</p>
//       </div>
//     );
//   }

//   if (selectedGroup) {
//     const userRole = selectedGroup.members?.find(
//       (m) => m.user === authUser._id || m.user?._id === authUser._id
//     )?.role;

//     return (
//       <div className="p-4 border-b border-base-300 flex items-center justify-between">
//         <div
//           className="flex items-center gap-4 select-none cursor-pointer"
//           onClick={handleGroupClick}
//         >
//           <div className="avatar">
//             <div className="rounded-full size-10 border">
//               <img
//                 src={selectedGroup.imageUrl || "/avatar.png"}
//                 alt="Group Avatar"
//                 className="object-cover"
//               />
//             </div>
//           </div>
//           <div>
//             <h2 className="font-semibold text-base text-base-content">
//               {selectedGroup.name}
//             </h2>
//             <p className="text-sm text-zinc-500">
//               {selectedGroup.members?.length || 0} members
//               {userRole ? ` • You are ${userRole}` : ""}
//             </p>
//             <span className="badge badge-info badge-sm mt-1">Group Chat</span>
//           </div>
//         </div>

//         <button
//           className="btn btn-sm btn-circle btn-ghost text-zinc-500 hover:text-red-500"
//           onClick={clearChat}
//         >
//           <X size={18} />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 border-b border-base-300 flex items-center justify-between">
//       <div className="flex items-center gap-4">
//         <div className="avatar">
//           <div className="rounded-full size-10 border">
//             <img
//               src={selectedUser?.profilePic || "/avatar.png"}
//               alt={selectedUser?.fullName}
//             />
//           </div>
//         </div>
//         <div>
//           <h2 className="font-semibold text-base text-base-content">
//             {selectedUser?.fullName}
//           </h2>
//           <p className="text-sm text-zinc-500">
//             {selectedUser?.isOnline ? "Online" : "Offline"}
//           </p>
//           <span className="badge badge-accent badge-sm mt-1">Private Chat</span>
//         </div>
//       </div>

//       <button
//         className="btn btn-sm btn-circle btn-ghost text-zinc-500 hover:text-red-500"
//         onClick={clearChat}
//       >
//         <X size={18} />
//       </button>
//     </div>
//   );
// };


// export default ChatHeader;

import { useChatStore } from "../store/useChatStore";
import { useGroupStore } from "../store/useGroupStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallStore } from "../store/useCallStore"; // 👈 Add this

const ChatHeader = ({socket}) => {
  const navigate = useNavigate();
  const { selectedUser, setSelectedUser } = useChatStore();
  const { selectedGroup, setSelectedGroup, getGroupDetails } = useGroupStore();
  const { authUser } = useAuthStore();
  const { startCall } = useCallStore(); // 👈 Use the store

  const clearChat = () => {
    setSelectedUser(null);
    setSelectedGroup(null);
  };

  const handleGroupClick = async () => {
    if (!selectedGroup?._id) return;
    await getGroupDetails(selectedGroup._id); // fetch full data
    navigate(`/group/${selectedGroup._id}`);
  };

  if (!selectedUser && !selectedGroup) {
    return (
      <div className="p-4 border-b border-base-300 flex justify-between items-center">
        <p className="text-base-content text-sm">No chat selected</p>
      </div>
    );
  }

  if (selectedGroup) {
    const userRole = selectedGroup.members?.find(
      (m) => m.user === authUser._id || m.user?._id === authUser._id
    )?.role;

    return (
      <div className="p-4 border-b border-base-300 flex items-center justify-between">
        <div
          className="flex items-center gap-4 select-none cursor-pointer"
          onClick={handleGroupClick}
        >
          <div className="avatar">
            <div className="rounded-full size-10 border">
              <img
                src={selectedGroup.imageUrl || "/avatar.png"}
                alt="Group Avatar"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-base text-base-content">
              {selectedGroup.name}
            </h2>
            <p className="text-sm text-zinc-500">
              {selectedGroup.members?.length || 0} members
              {userRole ? ` • You are ${userRole}` : ""}
            </p>
            <span className="badge badge-info badge-sm mt-1">Group Chat</span>
          </div>
        </div>

        <button
          className="btn btn-sm btn-circle btn-ghost text-zinc-500 hover:text-red-500"
          onClick={clearChat}
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-base-300 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="rounded-full size-10 border">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
            />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-base text-base-content">
            {selectedUser?.fullName}
          </h2>
          <p className="text-sm text-zinc-500">
            {selectedUser?.isOnline ? "Online" : "Offline"}
          </p>
          <span className="badge badge-accent badge-sm mt-1">Private Chat</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* ✅ Call Button */}
        <button
          className="btn btn-sm btn-circle btn-ghost text-zinc-500 hover:text-green-500"
          disabled={!selectedUser?._id}
          onClick={() => {
            if (!socket || !selectedUser || !authUser) return;
            socket.emit("incoming-call", {
              to: selectedUser._id,
              from: authUser._id,
            });
            startCall({ user: selectedUser, isCaller: true });
            navigate(`/call/${selectedUser._id}`);

          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 5h4a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
            />
          </svg>
        </button>

        {/* ❌ Close Button */}
        <button
          className="btn btn-sm btn-circle btn-ghost text-zinc-500 hover:text-red-500"
          onClick={clearChat}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

