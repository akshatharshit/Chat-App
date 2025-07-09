import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCallStore } from "../store/useCallStore";
import { useAuthStore } from "../store/useAuthStore";
import { io } from "socket.io-client";
import { PhoneOff, PhoneIncoming, PhoneCall } from "lucide-react";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const VideoCallPage = () => {
  const { userId } = useParams();
  const { authUser } = useAuthStore();
  const { isCaller, endCall } = useCallStore();

  const navigateHome = () => (window.location.href = "/");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const timerRef = useRef(null);

  const [callAccepted, setCallAccepted] = useState(isCaller);
  const [callEnded, setCallEnded] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!authUser || !userId) return;

    const init = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = localStream;
      localVideoRef.current.srcObject = localStream;

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      peerConnectionRef.current = pc;

      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

      pc.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            to: userId,
            candidate: event.candidate,
          });
        }
      };

      socket.on("ice-candidate", ({ candidate }) => {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.on("offer", async ({ from, offer }) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { to: from, answer });
        setCallAccepted(true);
        startTimer();
      });

      socket.on("answer", async ({ answer }) => {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        setCallAccepted(true);
        startTimer();
      });

      socket.on("call-ended", () => {
        handleRemoteCallEnd();
      });

      if (isCaller) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { to: userId, offer });
      }

      socket.emit("join-call", { userId: authUser._id });
    };

    init();
    return () => cleanupCall(false);
  }, []);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const cleanupCall = (notify = true) => {
    stopTimer();

    if (notify) {
      socket.emit("end-call", { targetUserId: userId });
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    if (peerConnectionRef.current) {
      peerConnectionRef.current.ontrack = null;
      peerConnectionRef.current.onicecandidate = null;
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    socket.off("call-ended");
    socket.disconnect();
    endCall();
  };

  const handleRemoteCallEnd = () => {
    cleanupCall(false);
    setCallEnded(true);
    new Audio("/sounds/call-ended.mp3").play();
    setTimeout(navigateHome, 3000);
  };

  const handleEnd = () => {
    cleanupCall(true);
    navigateHome();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-white text-xl font-semibold mb-4">
        {callEnded ? "Call Ended" : "Video Call"}
      </div>

      {/* Video Display */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg border border-zinc-700">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-72 h-48 md:w-80 md:h-56 rounded-lg object-cover"
          />
        </div>
        <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg border border-zinc-700">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-72 h-48 md:w-80 md:h-56 rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Call Timer / Status */}
      <div className="mt-4 text-zinc-400 text-sm">
        {callAccepted ? `Duration: ${formatTime(callDuration)}` : isCaller ? "Calling..." : "Incoming call..."}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {!callAccepted && !isCaller && (
          <button className="btn btn-success gap-2" onClick={() => {
            setCallAccepted(true);
            startTimer();
          }}>
            <PhoneIncoming className="w-5 h-5" />
            Accept
          </button>
        )}
        <button className="btn btn-error gap-2" onClick={handleEnd}>
          <PhoneOff className="w-5 h-5" />
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;
