import { useState, useEffect, useCallback } from 'react';

export function useNotes() {
  const [notesRecord, setNotesRecord] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const loadedNotes: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('note_')) {
            loadedNotes[key] = localStorage.getItem(key) || '';
          }
        }
        setNotesRecord(loadedNotes);
      }
    } catch {
      // localStorage is unavailable or blocked
    }
  }, []);

  const saveNote = useCallback((key: string, content: string) => {
    setNotesRecord(prev => {
      const next = { ...prev };
      if (content.trim() === '') {
        delete next[key];
      } else {
        next[key] = content;
      }
      return next;
    });

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (content.trim() === '') {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, content);
        }
      }
    } catch {
      // localStorage unavailable
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
