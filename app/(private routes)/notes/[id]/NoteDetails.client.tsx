"use client";
import css from "@/app/notes/[id]/NoteDetails.client.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Link from "next/link"; 

export default function NoteDetailsClient({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.container}>
       <Link href="/notes/filter/All" className={css.backBtn}>
        ← Back
      </Link>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {note?.createdAt
            ? `Created at: ${note.createdAt}`
            : `Updated at: ${note.updatedAt}`}
        </p>
      </div>
    </div>
  );
}