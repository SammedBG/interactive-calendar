import { useState, useEffect, useCallback } from 'react';

const NOTE_PREFIX = 'note_';
const MAX_NOTE_LENGTH = 5000;

function loadNotesFromStorage(): Record<string, string> {
  const loadedNotes: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(NOTE_PREFIX)) {
      loadedNotes[key] = localStorage.getItem(key) || '';
    }
  }

  return loadedNotes;
}

export function useNotes() {
  const [notesRecord, setNotesRecord] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        setNotesRecord(loadNotesFromStorage());

        const handleStorage = (event: StorageEvent) => {
          if (event.storageArea !== window.localStorage) {
            return;
          }

          if (event.key && !event.key.startsWith(NOTE_PREFIX)) {
            return;
          }

          setNotesRecord(loadNotesFromStorage());
        };

        window.addEventListener('storage', handleStorage);
        return () => {
          window.removeEventListener('storage', handleStorage);
        };
      }
    } catch {
      // localStorage is unavailable or blocked
    }
  }, []);

  const saveNote = useCallback((key: string, content: string) => {
    if (!key.startsWith(NOTE_PREFIX)) {
      return;
    }

    const normalizedContent = content.slice(0, MAX_NOTE_LENGTH);
    const hasContent = normalizedContent.trim() !== '';

    setNotesRecord(prev => {
      const next = { ...prev };
      if (!hasContent) {
        delete next[key];
      } else {
        next[key] = normalizedContent;
      }
      return next;
    });

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (!hasContent) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, normalizedContent);
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
