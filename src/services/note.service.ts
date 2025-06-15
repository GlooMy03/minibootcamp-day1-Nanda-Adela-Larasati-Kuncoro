import prisma from "../config/database";
import { CreateNoteInput, UpdateNoteInput } from "../models/schemas";

export const createNote = async (userId: string, data: CreateNoteInput) => {
  return await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getUserNotes = async (userId: string) => {
  return await prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getNoteById = async (noteId: string, userId: string) => {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!note) {
    throw new Error("Note not found or access denied");
  }

  return note;
};

export const updateNote = async (
  noteId: string,
  userId: string,
  data: UpdateNoteInput
) => {
  const existingNote = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!existingNote) {
    throw new Error("Note not found or access denied");
  }

  return await prisma.note.update({
    where: { id: noteId },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const deleteNote = async (noteId: string, userId: string) => {
  const existingNote = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!existingNote) {
    throw new Error("Note not found or access denied");
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  return { message: "Note deleted successfully" };
};
