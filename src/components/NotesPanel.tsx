import { useState, useEffect, type ChangeEvent } from 'react';
import { format } from 'date-fns';
import { SelectionState } from '../hooks/useCalendar';

interface NotesPanelProps {
  selection: SelectionState;
  getNote: (key: string) => string;
  saveNote: (key: string, content: string) => void;
}

export function NotesPanel({ selection, getNote, saveNote }: NotesPanelProps) {
  const [content, setContent] = useState('');
  
  const noteKey = selection.start
    ? selection.end
      ? `note_${format(selection.start, 'yyyy-MM-dd')}_${format(selection.end, 'yyyy-MM-dd')}`
      : `note_${format(selection.start, 'yyyy-MM-dd')}`
    : null;

  useEffect(() => {
    if (noteKey) {
      setContent(getNote(noteKey));
    }
  }, [noteKey, getNote]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    if (noteKey) {
      saveNote(noteKey, val);
    }
  };

  if (!selection.start) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="text-[10px] font-extrabold text-neutral-600 dark:text-neutral-400 mb-4 tracking-wide">
          NOTES
        </h3>
        <div className="notes-paper flex-1 min-h-[220px] rounded-sm border border-neutral-200/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 px-3 py-2 text-xs text-neutral-400 dark:text-neutral-500">
          Select a date or range to add notes.
        </div>
      </div>
    );
  }

  const label = selection.end
    ? `Notes for ${format(selection.start, 'MMM d')} - ${format(selection.end, 'MMM d')}`
    : `Notes for ${format(selection.start, 'MMM d')}`;

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-[10px] font-extrabold text-neutral-600 dark:text-neutral-400 mb-4 tracking-wide">
        {label}
      </h3>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Type your notes here..."
        className="notes-paper w-full flex-1 min-h-[260px] resize-none rounded-sm border border-neutral-200/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 px-3 py-2 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none leading-[32px]"
        spellCheck="false"
      />
    </div>
  );
}
