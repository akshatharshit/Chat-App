import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useGroupStore } from "../store/useGroupStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, FolderKanban, Star, View } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const {
    getGroups,
    groups,
    selectedGroup,
    setSelectedGroup,
    isGroupsLoading,
  } = useGroupStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
    getGroups();
  }, []);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading && isGroupsLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-24 lg:w-80 border-r border-base-300 flex flex-col bg-base-100">
      {/* USERS SECTION */}
      <div className="border-b border-base-300 px-4 py-5 space-y-3">

        <div className="items-center space-x-2 gap-1">
          <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-semibold text-base hidden lg:block">Contacts</span>
        </div>

        <Link to="/uploadStatus" className="btn btn-sm gap-2">
          <Star className="size-5" />
          <span className="hidden sm:inline">Add Status</span>
        </Link>

        <Link to="/status" className="btn btn-sm gap-2">
          <View className="size-5" />
          <span className="hidden sm:inline">view Status</span>
        </Link>
        </div>

        <div className="hidden lg:flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span>Online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* USERS LIST */}
      <div className="overflow-y-auto flex-1 px-2 py-3 border-b border-base-300 space-y-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setSelectedGroup(null);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-base-200 ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-primary" : ""
                }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-12 h-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-500">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>

      {/* GROUPS SECTION */}
      <div className="border-b border-base-300 px-4 py-5 space-y-3">
        <div className="flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-primary" />
          <span className="font-semibold text-base hidden lg:block">Groups</span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-2 py-3 space-y-1">
        {groups.length > 0 ? (
          groups.map((group) => (
            <button
              key={group._id}
              onClick={() => {
                setSelectedGroup(group);
                setSelectedUser(null);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-base-200 ${selectedGroup?._id === group._id ? "bg-base-200 ring-1 ring-primary" : ""
                }`}
            >
              <div className="avatar">
                <div className="w-10 h-10 rounded-full border border-base-300">
                  <img
                    src={group.imageUrl || "/avatar.png"}
                    alt={group.name}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>
              <div className="hidden lg:block min-w-0 text-left">
                <div className="font-medium truncate">{group.name}</div>
                <div className="text-sm text-zinc-500 truncate">
                  {group.members?.length || 0} members
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No groups found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
