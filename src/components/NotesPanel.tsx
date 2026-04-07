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

  return (
    <div className="flex flex-col h-full transition-opacity animate-in fade-in duration-300">
      <h3 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-4 uppercase tracking-wide">
        Notes {selection.start ? (selection.end ? `(${format(selection.start!, 'M/d')} - ${format(selection.end!, 'M/d')})` : `(${format(selection.start!, 'M/d')})`) : ''}
      </h3>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Type here..."
        className="w-full flex-1 min-h-[250px] resize-none bg-transparent text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none leading-[32px] border-none p-0"
        style={{ 
          backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)`,
          backgroundAttachment: 'local'
        }}
        spellCheck="false"
      />
    </div>
  );
}
