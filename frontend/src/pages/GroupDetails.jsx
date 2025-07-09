import { useGroupStore } from "../store/useGroupStore";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id: groupIdFromUrl } = useParams();

  const {
    selectedGroup,
    getGroup,
    addGroupMember,
    removeGroupMember,
    deleteGroup,
    setSelectedGroup,
  } = useGroupStore();

  const { users, getUsers } = useChatStore();
  const { authUser } = useAuthStore();

  const [group, setGroup] = useState(null);
  const [memberInput, setMemberInput] = useState("");

  useEffect(() => {
    if (groupIdFromUrl) {
      fetchGroup(groupIdFromUrl);
      getUsers();
    }
  }, [groupIdFromUrl]);

  const fetchGroup = async (groupId) => {
    const g = await getGroup(groupId);
    setGroup(g);
    setSelectedGroup(g);
  };

  const handleAddMember = async () => {
    const user = users.find(
      (u) => u.email === memberInput || u.username === memberInput
    );
    if (!user) {
      toast.error("User not found");
      return;
    }
    await addGroupMember(group._id, user._id);
    setMemberInput("");
    fetchGroup(group._id);
  };

  const handleRemoveMember = async (userId) => {
    await removeGroupMember(group._id, userId);
    fetchGroup(group._id);
  };

  const handleDeleteGroup = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    await deleteGroup(group._id);
    setSelectedGroup(null);
    navigate("/");
  };

  const handleLeaveGroup = async () => {
    const confirmLeave = window.confirm("Are you sure you want to leave this group?");
    if (!confirmLeave) return;

    await removeGroupMember(group._id, authUser._id);
    setSelectedGroup(null);
    navigate("/");
  };

  if (!group) return <div className="p-4 mt-10">Loading group...</div>;

  const isCreator = String(group.createdBy?._id || group.createdBy) === String(authUser._id);

  const currentRole = isCreator
    ? "creator"
    : group.members.find(
        (m) => m.user._id === authUser._id || m.user === authUser._id
      )?.role;

  const canModify = currentRole === "creator" || currentRole === "admin";

  return (
    <div className="p-4 max-w-2xl mx-auto mt-24">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={group.imageUrl || "/avatar.png"}
            alt="Group"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-bold">{group.name}</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Access: <span className="font-medium">{group.accessControl}</span>
            </p>
            <p className="text-xs text-zinc-400">
              Members: {group.members?.length}
            </p>
          </div>
        </div>

        {isCreator && (
          <button
            onClick={handleDeleteGroup}
            className="btn btn-sm btn-outline btn-error font-semibold"
            title="Only group creator can delete"
          >
            🗑 Delete Group
          </button>
        )}
      </div>

      <h3 className="font-semibold text-lg mb-2">Members</h3>
      <ul className="space-y-2 mb-4">
        {group.members.map(({ user, role }) => (
          <li
            key={user._id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className="text-xs text-zinc-500 capitalize">{role}</p>
            </div>
            {canModify && authUser._id !== user._id && (
              <button
                onClick={() => handleRemoveMember(user._id)}
                className="btn btn-xs btn-outline btn-error"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      {canModify && (
        <div className="mt-6">
          <h4 className="text-sm mb-2 font-medium">
            Add Member (by username or email)
          </h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              className="input input-sm input-bordered w-full sm:flex-1"
              placeholder="Username or email"
            />
            <button className="btn btn-sm w-full sm:w-auto" onClick={handleAddMember}>
              Add
            </button>
          </div>
        </div>
      )}

      {!isCreator && (
        <div className="mt-8 text-left">
          <button
            onClick={handleLeaveGroup}
            className="btn btn-sm btn-error"
          >
            🚪 Leave Group
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;
