import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useStatusStore = create((set, get) => ({
  statuses: [],
  loading: false,
  error: null,

  // Fetch all current (non-expired) statuses
  fetchStatuses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/status");

      if (!Array.isArray(res.data)) {
        throw new Error("Unexpected response format");
      }

      set({ statuses: res.data });
    } catch (error) {
      console.error("❌ Failed to fetch statuses:", error);
      toast.error("❌ Failed to load statuses.");
      set({ error: "Failed to fetch statuses" });
    } finally {
      set({ loading: false });
    }
  },

  // Post a new status with media and optional caption
  postStatus: async (file, caption) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);

      await axiosInstance.post("/status", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Status posted!");
      await get().fetchStatuses();
    } catch (error) {
      console.error("❌ Failed to post status:", error);
      toast.error("❌ Failed to post status.");
      set({ error: "Failed to post status" });
    }
  },

  // Delete a status by ID (only if user is authorized)
  deleteStatus: async (statusId) => {
    try {
      await axiosInstance.delete(`/status/${statusId}`);
      toast.success("🗑️ Status deleted successfully");
      await get().fetchStatuses();
    } catch (error) {
      console.error("❌ Failed to delete status:", error);
      toast.error("❌ Failed to delete status.");
      set({ error: "Failed to delete status" });
    }
  },
}));
