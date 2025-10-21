"use client";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();
  const onClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Could not fetch note. {error?.message}</p>;

  return (
    <Modal onClose={onClose}>
      <h2  className={css.header}>{note.title}</h2>
      <b className={css.tag}>{note.tag}</b>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{note.updatedAt ?? note.createdAt}</p>
    </Modal>
  );
};

export default NotePreviewClient;