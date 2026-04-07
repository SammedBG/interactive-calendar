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

  return (
    <div className="flex flex-col h-full transition-opacity animate-in fade-in duration-500">
      <h3 className="text-[10px] sm:text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-6 uppercase tracking-[0.2em]">
        Editorial Notes {selection.start ? (selection.end ? `(${format(selection.start!, 'M/d')} - ${format(selection.end!, 'M/d')})` : `(${format(selection.start!, 'M/d')})`) : ''}
      </h3>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Document your thoughts..."
        className="w-full flex-1 min-h-[250px] resize-none bg-transparent text-sm sm:text-base text-neutral-700 dark:text-neutral-300 focus:outline-none leading-[36px] border-none p-0 font-outfit"
        style={{ 
          backgroundImage: `repeating-linear-gradient(transparent, transparent 35px, rgba(163, 163, 163, 0.2) 35px, rgba(163, 163, 163, 0.2) 36px)`,
          backgroundAttachment: 'local'
        }}
        spellCheck="false"
      />
    </div>
  );
}
