import Contact from "../models/contact.model.js";
import User from "../models/contact.model.js";
import nodemailer from "nodemailer";

// Get all contacts
export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().populate("createdBy", "email username");
  res.json(contacts);
};

// Get contact by username
export const getContactByUsername = async (req, res) => {
  const { username } = req.params;
  const contact = await Contact.findOne({ username }).populate("createdBy", "email username");
  if (!contact) return res.status(404).json({ error: "Contact not found" });
  res.json(contact);
};

// Update contact (only creator)
export const updateContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ error: "Contact not found" });

  if (!contact.createdBy.equals(req.user._id)) {
    return res.status(403).json({ error: "You can only update your own contact" });
  }

  Object.assign(contact, req.body);
  await contact.save();
  res.json(contact);
};

// Delete contact (only creator)
export const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ error: "Contact not found" });

  if (!contact.createdBy.equals(req.user._id)) {
    return res.status(403).json({ error: "You can only delete your own contact" });
  }

  await contact.deleteOne();
  res.json({ message: "Contact deleted" });
};

// Increment work done
export const incrementWorkDone = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ error: "Contact not found" });

  contact.workDone += 1;
  await contact.save();
  res.json({ message: "Work count incremented", workDone: contact.workDone });
};

// Send email to creator
export const sendEmailToCreator = async (req, res) => {
  const contact = await Contact.findById(req.params.id).populate("createdBy");
  if (!contact) return res.status(404).json({ error: "Contact not found" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: contact.createdBy.email,
    subject: "A message about your contact",
    text: req.body.message || "Someone contacted you regarding your volunteer profile.",
  };

  await transporter.sendMail(mailOptions);
  res.json({ message: "Email sent successfully" });
};


//create 
// Create new contact
export const createContact = async (req, res) => {
  try {
    const { username, mobile, occupation, description, isAvailable, workDone, createdBy } = req.body;

    if (!username || !mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ error: "Username and valid 10-digit mobile number are required" });
    }

    const contact = new Contact({
      username,
      mobile,
      occupation,
      description,
      isAvailable,
      workDone,
      createdBy,
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error("Create Contact Error:", err.message);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

