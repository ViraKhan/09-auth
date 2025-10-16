import { Note, NoteTag } from "@/types/note";
import apiClient from "./api";


// Відповідь від сервера при отриманні списку нотаток

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

// Параметри для отримання нотаток

interface FetchNotesParams {
    page?: number;
    query?: string;
    tag?: string;
}

// Дані для створення нової нотатки

export interface NewNotePayload {
    title: string;
    content: string;
    tag: NoteTag;

}

// Cписoк нотаток з підтримкою пагінації, пошуку та фільтрації за тегом

export const fetchNotes = async ({
    page = 1,
    query = "",
    tag = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await apiClient.get<FetchNotesResponse>("/notes", {
        params: {
            page,
            perPage: 12,
            ...(query ? { search: query } : {}),
            ...(tag ? { tag } : {}),
        },
    });
    return response.data;
};

// Створення нової нотатки
export const createNote = async (noteData: NewNotePayload): Promise<Note> => {
    const response = await apiClient.post<Note>("/notes", noteData);
    return response.data;
};

// Оновлення нотатки
export const deleteNote = async (noteId: string): Promise<Note> => {
    if (!noteId) {
        throw new Error("Note ID is required for deletion");
    }
    const response = await apiClient.delete<Note>(`/notes/${noteId}`);
    return response.data;
};


// Отримання нотатки за ID
export const fetchNoteById = async (noteId: string): Promise<Note> => {
    const response = await apiClient.get<Note>(`/notes/${noteId}`);
    return response.data;
};

