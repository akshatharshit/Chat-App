import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContactStore } from "../store/useContactStore";
import { User, Phone, Briefcase, FileText, MailCheck, ListChecks } from "lucide-react";
import toast from "react-hot-toast";

const EditContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getContacts, contacts, updateContact } = useContactStore();

  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    occupation: "",
    description: "",
    isAvailable: false,
    workDone: 0,
  });

  // Get contact by ID from local store
  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    const contact = contacts.find((c) => c._id === id);
    if (contact) {
      setFormData({
        username: contact.username,
        mobile: contact.mobile,
        occupation: contact.occupation,
        description: contact.description,
        isAvailable: contact.isAvailable,
        workDone: contact.workDone,
      });
    }
  }, [contacts, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContact(id, formData);
      toast.success("Contact updated successfully!");
      navigate("/contacts");
    } catch {
      toast.error("Failed to update contact");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-base-100 shadow-md rounded-lg space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold">Edit Contact</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div className="form-control">
          <label className="label">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="form-control">
          <label className="label">Mobile</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </div>

        {/* Occupation */}
        <div className="form-control">
          <label className="label">Occupation</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full pl-10 pt-3"
              rows={3}
            />
          </div>
        </div>

        {/* Availability */}
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">Available for Volunteer Work</span>
        </label>

        {/* Work Done */}
        <div className="form-control">
          <label className="label">Work Done</label>
          <div className="relative">
            <MailCheck className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
            <input
              type="number"
              name="workDone"
              value={formData.workDone}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              min={0}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;
