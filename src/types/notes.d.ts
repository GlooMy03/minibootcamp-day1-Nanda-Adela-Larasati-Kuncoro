export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface NotesResponse {
  message: string;
  notes: Note[];
}

export interface NoteResponse {
  message: string;
  note: Note;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  title: string;
  content: string;
}

export interface DeleteNoteResponse {
  message: string;
}