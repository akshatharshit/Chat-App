import express from 'express';
import {
   createGroup,
  deleteGroup,
  addMember,
  removeMember,
  getGroups,
  getGroupDetails,
  postMessage
} from '../controllers/group.controller.js';
import { getMessages } from '../controllers/groupmessage.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createGroup);
router.get('/:groupId', protectRoute, getGroupDetails);
router.delete('/:groupId', protectRoute, deleteGroup);
router.post('/:groupId/add-member', protectRoute, addMember);
router.post("/:groupId/messages", protectRoute, postMessage);
router.get('/:groupId/messages', protectRoute, getMessages);
router.get("/", protectRoute, getGroups);
router.post('/:groupId/add-member', protectRoute, addMember);
router.post('/:groupId/remove-member', protectRoute, removeMember);

export default router;
