import { useState, useEffect, useCallback } from 'react';

export function useNotes() {
  const [notesRecord, setNotesRecord] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load all notes from localStorage on mount.
    // They are prefixed with 'note_'
    const loadedNotes: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('note_')) {
        loadedNotes[key] = localStorage.getItem(key) || '';
      }
    }
    setNotesRecord(loadedNotes);
  }, []);

  const saveNote = useCallback((key: string, content: string) => {
    if (content.trim() === '') {
      localStorage.removeItem(key);
      setNotesRecord(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } else {
      localStorage.setItem(key, content);
      setNotesRecord(prev => ({ ...prev, [key]: content }));
    }
  }, []);

  const getNote = useCallback((key: string) => {
    return notesRecord[key] || '';
  }, [notesRecord]);

  return {
    notesRecord,
    saveNote,
    getNote,
  };
}
