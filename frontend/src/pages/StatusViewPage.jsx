import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useStatusStore } from "../store/useStatusStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export default function StatusViewPage() {
  const [statuses, setStatuses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = useAuthStore((state) => state.authUser);
  const deleteStatus = useStatusStore((state) => state.deleteStatus);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/status");
        setStatuses(res.data);
      } catch (err) {
        toast.error("Failed to load statuses");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const openStatus = (userId) => {
    const userStatuses = statuses.filter((s) => s.user?._id === userId);
    if (userStatuses.length) {
      const fullUser = userStatuses[0].user;
      const enrichedStatuses = userStatuses.map((s) => ({
        ...s,
        user: fullUser,
      }));
      setSelected({ user: fullUser, items: enrichedStatuses });
    }
  };

  const closeViewer = () => setSelected(null);

  const handleDelete = async (id) => {
    await deleteStatus(id);
    setStatuses((prev) => prev.filter((s) => s._id !== id));
    toast.success("🗑️ Status deleted");
    closeViewer();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 mt-24 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        🟢 Recent Status Updates
      </h2>

      {/* User Thumbnails */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-primary">
        {[...new Map(statuses.map((s) => [s.user?._id, s.user])).values()].map((user) => (
          <div
            key={user._id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => openStatus(user._id)}
          >
            <div className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden group-hover:scale-105 transition-transform shadow-lg">
              <img
                src={user.profilePic}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs mt-2 text-center max-w-[5rem] truncate font-medium">
              {user.fullName || user.username}
            </p>
          </div>
        ))}
      </div>

      {/* Status Viewer */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col justify-center items-center z-50 p-4">
          <button onClick={closeViewer} className="absolute top-5 left-5 text-white">
            <ArrowLeft className="w-8 h-8" />
          </button>

          {selected.items.map((status) => (
            <div
              key={status._id}
              className="text-white max-w-md w-full mx-auto my-6"
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={status.user.profilePic}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-white"
                />
                <span className="font-semibold text-lg">
                  {status.user.fullName || status.user.username}
                </span>
                <span className="text-sm opacity-60 ml-auto">
                  {new Date(status.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Media + Conditional Delete */}
              <div className="bg-base-100 rounded-xl overflow-hidden shadow-lg relative">
                {currentUser?._id === status.user._id && (
                  <button
                    onClick={() => handleDelete(status._id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-600 hover:bg-red-700 text-white transition-transform hover:scale-105"
                    title="Delete Status"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {status.mediaUrl.includes("video") ? (
                  <video
                    src={status.mediaUrl}
                    controls
                    className="w-full h-[300px] object-contain bg-black rounded-lg"
                  />
                ) : (
                  <img
                    src={status.mediaUrl}
                    alt="status"
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Caption */}
              {status.caption && (
                <p className="mt-3 text-sm text-gray-300 text-center italic">
                  {status.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
