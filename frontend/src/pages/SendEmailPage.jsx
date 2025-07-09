import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContactStore } from "../store/useContactStore";
import { Mail, XCircle, Send } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SendEmailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sendEmailToCreator } = useContactStore();

  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Regarding Volunteer Opportunity");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      await sendEmailToCreator(id, `${subject}\n\n${message}`);
      toast.success("Email sent successfully!");
      navigate("/contacts");
    } catch (err) {
      toast.error("Failed to send email.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-2xl mx-auto mt-24 bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 rounded-full p-2">
          <Mail className="text-primary w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Send Email</h1>
          <p className="text-sm text-base-content/60">
            Write and send a custom message to the contact creator.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSend} className="space-y-6">
        {/* Subject */}
        <div className="form-control">
          <p className="text-sm font-semibold mb-1">Subject</p>
          <input
            type="text"
            className="input input-bordered input-primary"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="form-control">
          <p className="text-sm font-semibold mb-1">Message</p>
          <textarea
            className="textarea textarea-bordered w-full min-h-[140px] focus:textarea-primary"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-error"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Send className="w-4 h-4 mr-1" />
            Send Email
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SendEmailPage;
