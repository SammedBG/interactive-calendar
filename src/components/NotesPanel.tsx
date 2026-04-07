import { useState, useEffect, type ChangeEvent } from 'react';
import { format } from 'date-fns';
import { SelectionState } from '../hooks/useCalendar';
import { ThemeClasses } from './CalendarLayout';

interface NotesPanelProps {
  selection: SelectionState;
  themeClasses: ThemeClasses;
  getNote: (key: string) => string;
  saveNote: (key: string, content: string) => void;
}

export function NotesPanel({ selection, themeClasses, getNote, saveNote }: NotesPanelProps) {
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
      <div className="p-4 sm:p-6 text-neutral-400 dark:text-neutral-500 italic text-sm border-t border-neutral-200 dark:border-neutral-800">
        Select a date or range to add notes.
      </div>
    );
  }

  const label = selection.end
    ? `Notes for ${format(selection.start, 'MMM d')} – ${format(selection.end, 'MMM d')}`
    : `Notes for ${format(selection.start, 'MMM d')}`;

  return (
    <div className="p-4 sm:p-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3 transition-opacity animate-in fade-in slide-in-from-bottom-4 duration-300">
      <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${themeClasses.bg}`} />
        {label}
      </label>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Type your notes here... (Saved automatically)"
        className={`w-full min-h-[100px] resize-y p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 ${themeClasses.ring} transition-all shadow-inner`}
      />
    </div>
  );
}
