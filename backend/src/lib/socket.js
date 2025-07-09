
import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { postMessage } from "../controllers/group.controller.js"; // from earlier

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    credentials: true
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// store online users
const userSocketMap = {}; 

//  SOCKET.IO SERVER 
io.on("connection", async (socket) => {
  // console.log("A user connected:", socket.id);

    socket.on("join-call", ({ userId }) => {
    userSocketMap[userId] = socket.id;
    socket.userId = userId;
    // console.log("🔗 User joined call:", userId);
  });

  socket.on("incoming-call", ({ to }) => {
    const from = socket.userId;
    const targetSocketId = userSocketMap[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit("incoming-call", { from });
    }
    // console.log(from);
  });

  socket.on("accept-call", ({ from }) => {
    const targetSocketId = userSocketMap[from];
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-accepted");
    }
    // console.log("Call Accepted");
  });

  socket.on("decline-call", ({ from }) => {
    const targetSocketId = userSocketMap[from];
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-declined");
    }
    // console.log("Call Declined");
  });

  socket.on("offer", ({ to, offer }) => {
    const targetSocketId = userSocketMap[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit("offer", { from: socket.userId, offer });
    }
    // console.log("Offer Sent" , userId);
  });

  socket.on("answer", ({ to, answer }) => {
    const targetSocketId = userSocketMap[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit("answer", { answer });
    }
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    const targetSocketId = userSocketMap[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice-candidate", { candidate });
    }
  });

  socket.on("end-call", ({ targetUserId }) => {
    const targetSocketId = userSocketMap[targetUserId];
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-ended");
    }
  });

  // Accept userId from query (already done)
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Join a group room
  socket.on("joinGroup", ({ groupId }) => {
    socket.join(groupId);
    // console.log(`User ${userId} joined group ${groupId}`);
  });

  // Send message (text/image)
  socket.on("sendMessage", async ({ groupId, contentType, content, imageUrl }) => {
    if (!userId) return;

    try {
      const message = await postMessage({
        groupId,
        senderId: userId,
        contentType,
        content,
        imageUrl
      });

      // Emit to all members in group room
      io.to(groupId).emit("newMessage", message);
    } catch (err) {
      console.error("Error sending message:", err.message);
      socket.emit("errorMessage", "Failed to send message");
    }
  });

  

 socket.on("disconnect", () => {
    for (const [userId, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
    // console.log("❌ User disconnected:", socket.id);
  });

  
});

export { io, app, server };
