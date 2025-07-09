import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { User, Phone, Briefcase, FileText, MailCheck, ListChecks } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CreateContactPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    occupation: "",
    description: "",
    isAvailable: false,
    workDone: 0,
  });

  useEffect(() => {
    if (authUser?.username) {
      setFormData((prev) => ({ ...prev, username: authUser.username }));
    }
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !/^\d{10}$/.test(formData.mobile)) {
      toast.error("Username and a valid 10-digit mobile number are required.");
      return;
    }

    try {
      await axiosInstance.post("/contacts", {
        ...formData,
        createdBy: authUser._id,
      });
      toast.success("Contact created successfully!");
      navigate("/contacts");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating contact.");
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr] mt-12">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col justify-center items-center p-6 sm:p-12"
      >
        <div className="w-full max-w-xl space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ListChecks className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Contact Info</h1>
              <p className="text-base-content/60">Add detailed contact information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <input
                  type="text"
                  name="username"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mobile Number</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <input
                  type="text"
                  name="mobile"
                  className="input input-bordered w-full pl-10"
                  placeholder="10-digit mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="\d{10}"
                  required
                />
              </div>
            </div>

            {/* Occupation */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Occupation</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <input
                  type="text"
                  name="occupation"
                  className="input input-bordered w-full pl-10"
                  placeholder="Doctor, Engineer..."
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full pl-10 pt-3"
                  rows={3}
                  placeholder="What are they good at?"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="form-control">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  className="checkbox checkbox-primary"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
                <span className="label-text font-medium">Available for Volunteer Work</span>
              </label>
            </div>

            {/* Work Done */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Work Done Count</span>
              </label>
              <div className="relative">
                <MailCheck className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                <input
                  type="number"
                  name="workDone"
                  className="input input-bordered w-full pl-10"
                  min={0}
                  value={formData.workDone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              Create Contact
            </button>
          </form>
        </div>
      </motion.div>

      {/* Right Side - Pattern Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className="hidden lg:block"
      >
        <AuthImagePattern
          title="Create a Contact"
          subtitle="Manage volunteer availability and professional connections all in one place."
        />
      </motion.div>
    </div>
  );
};

export default CreateContactPage;
