import { Request, Response } from 'express';
import { createNote, getUserNotes, getNoteById, updateNote, deleteNote } from '../services/note.service';
import { CreateNoteInput, UpdateNoteInput } from '../models/schemas';

interface AuthRequest extends Request {
  userId?: string;
}

export const createNoteController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const data: CreateNoteInput = req.body;
    const note = await createNote(userId, data);
    
    res.status(201).json({
      message: 'Note created successfully',
      note,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create note';
    res.status(400).json({ error: message });
  }
};

export const getNotesController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const notes = await getUserNotes(userId);
    
    res.status(200).json({
      message: 'Notes retrieved successfully',
      notes,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve notes';
    res.status(500).json({ error: message });
  }
};

export const getNoteController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const noteId = req.params.id;
    const note = await getNoteById(noteId, userId);
    
    res.status(200).json({
      message: 'Note retrieved successfully',
      note,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve note';
    const statusCode = message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: message });
  }
};

export const updateNoteController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const noteId = req.params.id;
    const data: UpdateNoteInput = req.body;
    const note = await updateNote(noteId, userId, data);
    
    res.status(200).json({
      message: 'Note updated successfully',
      note,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update note';
    const statusCode = message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: message });
  }
};

export const deleteNoteController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const noteId = req.params.id;
    const result = await deleteNote(noteId, userId);
    
    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete note';
    const statusCode = message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: message });
  }
};