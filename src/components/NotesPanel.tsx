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
    <div className="flex flex-col h-full">
      <h3 className="text-[10px] font-extrabold text-neutral-600 dark:text-neutral-400 mb-6 tracking-wide">
        MONTHLY NOTES
      </h3>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder=""
        className="w-full flex-1 min-h-[300px] resize-none bg-transparent text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none leading-[46px] border-none p-0"
        style={{ 
          backgroundImage: `repeating-linear-gradient(transparent, transparent 45px, #e5e5e5 45px, #e5e5e5 46px)`,
          backgroundAttachment: 'local'
        }}
        spellCheck="false"
      />
    </div>
  );
}
