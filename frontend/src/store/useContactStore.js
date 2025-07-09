import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useContactStore = create((set, get) => ({
  contacts: [],
  selectedContact: null,
  isContactsLoading: false,
  isContactUpdating: false,

  // Fetch all contacts
  getContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/contacts");
      set({ contacts: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch contacts");
    } finally {
      set({ isContactsLoading: false });
    }
  },

  // Get a contact by username
  getContactByUsername: async (username) => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get(`/contacts/${username}`);
      set({ selectedContact: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Contact not found");
    } finally {
      set({ isContactsLoading: false });
    }
  },

  // ✅ Create a new contact (with authUser as createdBy if not passed)
  createContact: async (contactData) => {
    const authUser = useAuthStore.getState().authUser;
    try {
      const payload = {
        ...contactData,
        createdBy: contactData.createdBy || authUser?._id,
      };
      const res = await axiosInstance.post("/contacts", payload);
      set({ contacts: [...get().contacts, res.data] });
      toast.success("Contact created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create contact");
    }
  },

  // Update contact (only creator)
  updateContact: async (id, updateData) => {
    set({ isContactUpdating: true });
    try {
      const res = await axiosInstance.put(`/contacts/${id}`, updateData);
      set({
        contacts: get().contacts.map((c) =>
          c._id === id ? res.data : c
        ),
        selectedContact: res.data,
      });
      toast.success("Contact updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update contact");
    } finally {
      set({ isContactUpdating: false });
    }
  },

  // Delete contact (only creator)
  deleteContact: async (id) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      set({
        contacts: get().contacts.filter((c) => c._id !== id),
        selectedContact: null,
      });
      toast.success("Contact deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete contact");
    }
  },

  // Increment work done count
  incrementWorkDone: async (id) => {
    try {
      const res = await axiosInstance.patch(`/contacts/${id}/increment`);
      set({
        contacts: get().contacts.map((c) =>
          c._id === id ? { ...c, workDone: res.data.workDone } : c
        ),
      });
      toast.success("Work count incremented");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to increment work count");
    }
  },

  // Send email to the contact's creator
  sendEmailToCreator: async (id, message) => {
    try {
      await axiosInstance.post(`/contacts/${id}/email`, { message });
      toast.success("Email sent to creator");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email");
    }
  },

  // Set selected contact
  setSelectedContact: (contact) => set({ selectedContact: contact }),
}));
