import { Router } from "express";
import {
  createNoteController,
  getNotesController,
  getNoteController,
  updateNoteController,
  deleteNoteController,
} from "../controllers/note.controller";
import { authenticate } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/validation";
import {
  createNoteSchema,
  updateNoteSchema,
  noteParamsSchema,
} from "../models/schemas";

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post("/", validateBody(createNoteSchema), createNoteController);
router.get("/", getNotesController);
router.get("/:id", validateParams(noteParamsSchema), getNoteController);
router.put(
  "/:id",
  validateParams(noteParamsSchema),
  validateBody(updateNoteSchema),
  updateNoteController
);
router.delete("/:id", validateParams(noteParamsSchema), deleteNoteController);

export default router;
