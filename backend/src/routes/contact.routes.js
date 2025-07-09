import express from "express";
import {
  getAllContacts,
  getContactByUsername,
  updateContact,
  deleteContact,
  incrementWorkDone,
  sendEmailToCreator,
  createContact
} from "../controllers/contact.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; 

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:username", getContactByUsername);
router.put("/:id", protectRoute, updateContact);
router.delete("/:id", protectRoute, deleteContact);
router.patch("/:id/increment",protectRoute, incrementWorkDone);
router.post("/:id/email", sendEmailToCreator);

export default router;
