// import { create } from "zustand";
// import toast from "react-hot-toast";
// import { axiosInstance } from "../lib/axios";
// import { useAuthStore } from "./useAuthStore";

// export const useGroupStore = create((set, get) => ({
//   groups: [],
//   messages: [],
//   selectedGroup: null,
//   isGroupsLoading: false,
//   isMessagesLoading: false,

//   // Fetch all groups
//   getGroups: async () => {
//     set({ isGroupsLoading: true });
//     try {
//       const res = await axiosInstance.get("/groups");
//       set({ groups: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch groups");
//     } finally {
//       set({ isGroupsLoading: false });
//     }
//   },

//   // Fetch a single group
//   getGroup: async (groupId) => {
//     try {
//       const res = await axiosInstance.get(`/groups/${groupId}`);
//       return res.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch group");
//       return null;
//     }
//   },

//   // ✅ Get detailed group info and update selectedGroup
//   getGroupDetails: async (groupId) => {
//     try {
//       const res = await axiosInstance.get(`/groups/${groupId}`);
//       set({ selectedGroup: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load group details");
//     }
//   },

//   // Create a new group
//   createGroup: async (groupData) => {
//     try {
//       const res = await axiosInstance.post("/groups", groupData);
//       set({ groups: [...get().groups, res.data] });
//       toast.success("Group created successfully");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create group");
//     }
//   },

//   // Set selected group in state
//   setSelectedGroup: (group) => set({ selectedGroup: group }),

//   // Fetch messages for a group
//   getGroupMessages: async (groupId) => {
//     set({ isMessagesLoading: true });
//     try {
//       const res = await axiosInstance.get(`/groups/${groupId}/messages`);
//       console.log("Fetched group messages:", res.data);
//       set({ messages: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load messages");
//     } finally {
//       set({ isMessagesLoading: false });
//     }
//   },

//   // Send a message to the group
//   sendGroupMessage: async ({ groupId, contentType, content, imageUrl }) => {
//     try {
//       const payload = { contentType, content, imageUrl };
//       const res = await axiosInstance.post(`/groups/${groupId}/messages`, payload);
//       set({ messages: [...get().messages, res.data] });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to send message");
//     }
//   },

//   // Add a member to a group
//   addGroupMember: async (groupId, userIdToAdd) => {
//     try {
//       await axiosInstance.post(`/groups/${groupId}/add-member`, { userIdToAdd });
//       toast.success("Member added");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add member");
//     }
//   },

//   // ✅ Remove a member from a group
//   removeGroupMember: async (groupId, userIdToRemove) => {
//     try {
//       const res = await axiosInstance.post(`/groups/${groupId}/remove-member`, { userIdToRemove });
//       toast.success("Member removed");
//       set({ selectedGroup: res.data }); // updated group returned
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to remove member");
//     }
//   },

//   // ✅ Delete a group
//   deleteGroup: async (groupId) => {
//     try {
//       await axiosInstance.delete(`/groups/${groupId}`);
//       set({ groups: get().groups.filter((g) => g._id !== groupId), selectedGroup: null });
//       toast.success("Group deleted");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete group");
//     }
//   },

//   // Socket.io: receive real-time group messages
//   subscribeToGroupMessages: () => {
//     const { selectedGroup } = get();
//     if (!selectedGroup) return;

//     const socket = useAuthStore.getState().socket;

//     socket.on("newGroupMessage", (newMessage) => {
//       if (newMessage.group === selectedGroup._id) {
//         set({ messages: [...get().messages, newMessage] });
//       }
//     });
//   },

//   unsubscribeFromGroupMessages: () => {
//     const socket = useAuthStore.getState().socket;
//     socket.off("newGroupMessage");
//   },

//   // Check if current user can send in the group
//   canSendMessages: () => {
//   const { selectedGroup } = get();
//   const { authUser } = useAuthStore.getState();
//   if (!selectedGroup || !authUser) return false;

//   // If the user is a member of the group, allow sending messages
//   return selectedGroup.members?.some(
//     (m) => m.user === authUser._id || m.user?._id === authUser._id
//   );
// }

// }));












import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useGroupStore = create((set, get) => ({
  groups: [],
  messages: [],
  selectedGroup: null,
  isGroupsLoading: false,
  isMessagesLoading: false,

  getGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      const res = await axiosInstance.get("/groups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch groups");
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  getGroup: async (groupId) => {
    try {
      const res = await axiosInstance.get(`/groups/${groupId}`);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch group");
      return null;
    }
  },

  getGroupDetails: async (groupId) => {
    try {
      const res = await axiosInstance.get(`/groups/${groupId}`);
      set({ selectedGroup: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load group details");
    }
  },

  createGroup: async (groupData) => {
    try {
      const res = await axiosInstance.post("/groups", groupData);
      set({ groups: [...get().groups, res.data] });
      toast.success("Group created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create group");
    }
  },

  setSelectedGroup: (group) => set({ selectedGroup: group }),

  getGroupMessages: async (groupId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/groups/${groupId}/messages`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendGroupMessage: async ({ groupId, contentType, content, imageUrl }) => {
    try {
      const payload = { contentType, content, imageUrl };
      const res = await axiosInstance.post(`/groups/${groupId}/messages`, payload);
      set((state) => ({ messages: [...state.messages, res.data] }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  addGroupMember: async (groupId, userIdToAdd) => {
    try {
      await axiosInstance.post(`/groups/${groupId}/add-member`, { userIdToAdd });
      toast.success("Member added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add member");
    }
  },

  removeGroupMember: async (groupId, userIdToRemove) => {
    try {
      const res = await axiosInstance.post(`/groups/${groupId}/remove-member`, { userIdToRemove });
      toast.success("Member removed");
      set({ selectedGroup: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove member");
    }
  },

  deleteGroup: async (groupId) => {
    try {
      await axiosInstance.delete(`/groups/${groupId}`);
      set((state) => ({
        groups: state.groups.filter((g) => g._id !== groupId),
        selectedGroup: null,
      }));
      toast.success("Group deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete group");
    }
  },

  subscribeToGroupMessages: () => {
    const { selectedGroup } = get();
    const socket = useAuthStore.getState().socket;

    if (!selectedGroup || !socket) return;

    // Prevent duplicate listeners
    socket.off("newGroupMessage");

    socket.on("newGroupMessage", (newMessage) => {
      if (newMessage.group === selectedGroup._id) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });
  },

  unsubscribeFromGroupMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newGroupMessage");
    }
  },

  canSendMessages: () => {
    const { selectedGroup } = get();
    const { authUser } = useAuthStore.getState();
    if (!selectedGroup || !authUser) return false;

    return selectedGroup.members?.some(
      (m) => m.user === authUser._id || m.user?._id === authUser._id
    );
  },
}));

