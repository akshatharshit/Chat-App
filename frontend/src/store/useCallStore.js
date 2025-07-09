import { create } from "zustand";

export const useCallStore = create((set) => ({
  isCallActive: false,
  isCaller: false,
  targetUser: null,
  callSocketId: null,
  callStartedAt: null,

  startCall: ({ user, isCaller }) =>
    set({
      isCallActive: true,
      isCaller,
      targetUser: user,
      callStartedAt: new Date(),
    }),

  endCall: () =>
    set({
      isCallActive: false,
      isCaller: false,
      targetUser: null,
      callSocketId: null,
      callStartedAt: null,
    }),
}));
