import {
  useQuery,
  useMutation
} from "@tanstack/react-query";
import { baseHeaders } from "../header.config";

import type { NotesResponse, NoteResponse, CreateNoteRequest, UpdateNoteRequest, DeleteNoteResponse } from "../../types/notes";
import { BASE_API } from "../api.config";
import { query } from "../../lib/query";

const useGetNotes = () => {
  return useQuery<NotesResponse>({
    queryKey: ["QKEY_NOTES"],
    queryFn: async () => {
      const response = await fetch(`${BASE_API}/notes`, {
        headers: baseHeaders(),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  })
}

const useGetNoteById = (noteId: string) => {
  return useQuery<NoteResponse>({
    queryKey: ["QKEY_NOTE", noteId],
    queryFn: async () => {
      const response = await fetch(`${BASE_API}/notes/${noteId}`, {
        headers: baseHeaders(),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

const useCreateNote = () => {
  return useMutation<NoteResponse, Error, CreateNoteRequest>({
    mutationFn: async (newNote) => {
      const response = await fetch(`${BASE_API}/notes`, {
        method: "POST",
        headers: baseHeaders(),
        body: JSON.stringify(newNote),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["QKEY_NOTES"] });
    }
  });
}

const useUpdateNote = () => {
  return useMutation<
    NoteResponse,
    Error, {
      noteId: string;
      updatedNote: UpdateNoteRequest
    }>({
      mutationFn: async ({
        noteId,
        updatedNote
      }) => {
        const response = await fetch(`${BASE_API}/notes/${noteId}`, {
          method: "PUT",
          headers: baseHeaders(),
          body: JSON.stringify(updatedNote),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      },
      onSuccess: () => {
        query.invalidateQueries({ queryKey: ["QKEY_NOTES"] });
      }
    });
}

const useDeleteNote = () => {
  return useMutation<DeleteNoteResponse, Error, string>({
    mutationFn: async (noteId) => {
      const response = await fetch(`${BASE_API}/notes/${noteId}`, {
        method: "DELETE",
        headers: baseHeaders(),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["QKEY_NOTES"] });
    }
  });
}

export {
  useGetNotes,
  useGetNoteById,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
}