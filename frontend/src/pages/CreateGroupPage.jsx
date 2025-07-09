import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Users,
  ImageIcon,
  MessageSquare,
  Loader2,
  UserPlus,
  X,
} from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const [groupName, setGroupName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/messages/users");
        setUsers(res.data.filter((u) => u._id !== authUser._id));
      } catch (err) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, [authUser]);

  const handleSelectUser = (e) => {
    const id = e.target.value;
    if (id && !selectedUsers.includes(id)) {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleRemoveUser = (id) => {
    setSelectedUsers(selectedUsers.filter((uid) => uid !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const members = selectedUsers.map((id) => ({ user: id }));
      await axiosInstance.post("/groups", {
        name: groupName,
        imageUrl,
        accessControl: "admins",
        members,
      });
      toast.success("Group created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create group");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-[1fr_400px] bg-base-100">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-2">Create Group</h1>
              <p className="text-base-content/60 text-sm">Start a new conversation hub</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Group Name */}
            <div className="form-control">
              <label className="label font-medium text-sm">Group Name</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="e.g., Project Squad"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Group Image URL */}
            <div className="form-control">
              <label className="label font-medium text-sm">Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <input
                  type="url"
                  className="input input-bordered w-full pl-10"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Member Selection */}
            <div className="form-control">
              <label className="label font-medium text-sm">Add Members</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <select
                  className="select select-bordered w-full pl-10"
                  onChange={handleSelectUser}
                  defaultValue=""
                >
                  <option disabled value="">Select users to add</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.fullName} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Members */}
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedUsers.map((id) => {
                  const user = users.find((u) => u._id === id);
                  return (
                    <div
                      key={id}
                      className="badge badge-primary gap-1 items-center px-3 py-1"
                    >
                      {user?.fullName}
                      <button
                        type="button"
                        className="ml-1 text-xs"
                        onClick={() => handleRemoveUser(id)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Group"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - AuthImagePattern */}
      <div className="hidden lg:flex items-center justify-center bg-base-200 px-4 py-6">
        <div className="w-full max-w-xs text-center">
          <AuthImagePattern
            title="Start your community"
            subtitle="Create a group and bring your people together in one place for easy conversation."
          />
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
