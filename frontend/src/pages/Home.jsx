import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, LogIn, UserPlus, Users, Video, Group, Contact } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import ContributeSection from "../components/ContributeSection";

const Home = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const handleChatClick = () => {
    if (authUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Text + Buttons */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Welcome to <span className="text-primary">ChatSphere</span>
            </h1>
            <p className="text-lg text-zinc-600">
              Connect instantly. Chat with friends, groups, and professionals in a clean, real-time interface.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <button onClick={handleChatClick} className="btn btn-primary gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Chatting
              </button>

              {!authUser && (
                <button onClick={handleRegisterClick} className="btn btn-outline gap-2">
                  <UserPlus className="w-5 h-5" />
                  Register
                </button>
              )}
            </div>

            {!authUser && (
              <div className="text-sm text-zinc-500 mt-2">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-primary font-medium cursor-pointer hover:underline"
                >
                  Login
                </span>
              </div>
            )}
          </div>

          {/* Right - Image/Pattern */}
          <div className="hidden lg:block">
            <AuthImagePattern
              title={"Let's Chat!"}
              subtitle={"Sign in to continue your conversations and catch up with your messages."}
            />
          </div>
        </div>
      </div>

      <ContributeSection/>

      {/* Scrollable Features Section */}
      <div className="bg-base-100 px-6 py-10 border-t border-base-300">
        <h2 className="text-3xl font-bold text-center mb-8">What ChatSphere Offers</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto overflow-y-auto max-h-[400px] px-2">
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8 text-primary" />}
            title="One-on-One Chat"
            description="Have direct, real-time conversations with friends or colleagues in private."
          />
          <FeatureCard
            icon={<Group className="w-8 h-8 text-primary" />}
            title="Group Creation"
            description="Create groups to chat and collaborate with multiple people at once."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-primary" />}
            title="Community"
            description="Join or build communities to stay connected and share ideas."
          />
          <FeatureCard
            icon={<Video className="w-8 h-8 text-primary" />}
            title="One-on-One Video Calls"
            description="Make secure, real-time video calls with a single click."
          />
          <FeatureCard
            icon={<LogIn className="w-8 h-8 text-primary" />}
            title="Login / Signup"
            description="Secure authentication keeps your messages and account safe."
          />
          <FeatureCard
            icon={<Contact className="w-8 h-8 text-primary" />}
            title="Contact List"
            description="Manage your contacts and connect with new people easily."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-base-200 rounded-xl shadow-md p-6 space-y-4 hover:shadow-xl transition-all">
    <div>{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-zinc-600 text-sm">{description}</p>
  </div>
);

export default Home;
