import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";


import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import CreateGroupPage from "./pages/CreateGroupPage";
import GroupDetails from "./pages/GroupDetails";
import VideoCallPage from "./pages/VideoCallPage";
import ContactList from "./pages/ConatctList";
import CreateContactForm from "./pages/CreateContactForm";
import EditContactPage from "./pages/EditContactPage";
import SendEmailPage from "./pages/SendEmailPage";
import StatusUploader from "./pages/StatusUploader";
import Home from "./pages/Home";
import StatusViewPage from "./pages/StatusViewPage";





const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();


  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    // Update theme-color meta tag dynamically
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      // Set your own color or use DaisyUI variables
      const computedColor = getComputedStyle(document.documentElement).getPropertyValue("--p").trim();
      metaThemeColor.setAttribute("content", computedColor || "#ffffff");
    }
  }, [theme]);


  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/group/:id" element={<GroupDetails />} />
        <Route path="/call/:userId" element={<VideoCallPage />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/fill-contact" element={<CreateContactForm />} />
        <Route path="/contacts/edit/:id" element={<EditContactPage />} />
        <Route path="/contacts/email/:id" element={<SendEmailPage />} />
        <Route path="/uploadStatus" element={<StatusUploader/>} />
        <Route path="/status" element={<StatusViewPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;