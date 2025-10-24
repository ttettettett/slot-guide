'use client';

import { useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import {
  firebaseConfigStatus,
  getFirebaseAuth,
  getFirestoreDb,
  getGoogleAuthProvider
} from '@/lib/firebase';

type Note = {
  id: string;
  text: string;
  createdAt: Timestamp | null;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState('');

  const auth = useMemo(() => getFirebaseAuth(), []);
  const db = useMemo(() => getFirestoreDb(), []);
  const provider = useMemo(() => getGoogleAuthProvider(), []);

  useEffect(() => {
    if (!auth) {
      return undefined;
    }
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!user || !db) {
      setNotes([]);
      return undefined;
    }

    const notesQuery = query(
      collection(db, 'users', user.uid, 'notes'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
      const nextNotes: Note[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Note, 'id'>)
      }));
      setNotes(nextNotes);
    });

    return () => unsubscribe();
  }, [db, user]);

  const errorMessage = useMemo(() => {
    if (firebaseConfigStatus.isConfigComplete) {
      return '';
    }
    const missing = firebaseConfigStatus.missingKeys.join(', ');
    return `環境変数 ${missing} が設定されていません。`;
  }, []);

  const handleSignIn = async () => {
    if (!auth) {
      return;
    }
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Failed to sign in', error);
    }
  };

  const handleSignOut = async () => {
    if (!auth) {
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const handleCreateNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !db || !text.trim()) {
      return;
    }
    setPending(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'notes'), {
        text: text.trim(),
        createdAt: serverTimestamp()
      });
      setText('');
    } catch (error) {
      console.error('Failed to save note', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <main>
      <h1>Slot Guide Starter</h1>
      <p>
        Firebase App Hosting と Next.js 15 の最小構成です。Google サインインと
        Cloud Firestore の読み書きを確認できます。
      </p>

      {errorMessage ? (
        <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem' }}>
          <p style={{ margin: 0, color: '#b91c1c' }}>{errorMessage}</p>
        </div>
      ) : null}

      <section style={{ marginTop: '2rem' }}>
        {user ? (
          <div>
            <p>
              ログイン中: <strong>{user.displayName ?? user.email ?? user.uid}</strong>
            </p>
            <button onClick={handleSignOut}>サインアウト</button>
          </div>
        ) : (
          <button onClick={handleSignIn}>Google でサインイン</button>
        )}
      </section>

      {user ? (
        <section style={{ marginTop: '3rem' }}>
          <h2>ノート</h2>
          <form onSubmit={handleCreateNote} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="ノートを追加"
              style={{ flex: 1, padding: '0.5rem 0.75rem' }}
              disabled={pending}
            />
            <button type="submit" disabled={pending}>
              追加
            </button>
          </form>

          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem' }}>
            {notes.length === 0 ? (
              <li style={{ color: '#6b7280' }}>まだノートがありません。</li>
            ) : (
              notes.map((note) => (
                <li
                  key={note.id}
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
                    marginBottom: '0.75rem'
                  }}
                >
                  <p style={{ margin: 0 }}>{note.text}</p>
                  <small style={{ color: '#6b7280' }}>
                    {note.createdAt?.toDate().toLocaleString() ?? '同期中...'}
                  </small>
                </li>
              ))
            )}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
