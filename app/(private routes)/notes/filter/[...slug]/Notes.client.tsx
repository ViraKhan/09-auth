'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api/clientApi';
import css from './Notes.client.module.css';
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, tag]);

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', page, debouncedQuery, tag],
    queryFn: () => fetchNotes({ page, query: debouncedQuery, tag }),
    placeholderData: keepPreviousData,
  });

  const handlePageClick = (page: number): void => {
    setPage(page);
  };

  const handleDeleted = () => toast.success('Note deleted successfully!');

  return (
    <div>
      <Toaster position="top-right" />
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        {notesData && notesData.totalPages > 1 && (
          <Pagination
            pageCount={notesData.totalPages}
            currentPage={page}
            onPageChange={handlePageClick}
          />
        )}
        {/* замість кнопки тепер посилання */}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      <main>
        {isLoading && <p>Loading notes...</p>}
        {notesData && (
          <NoteList
            notes={notesData.notes}
            onDeleted={handleDeleted}
          />
        )}
      </main>
    </div>
  );
};

export default NotesClient;
