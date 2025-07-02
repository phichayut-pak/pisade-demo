// context/UserContext.tsx
'use client';
import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

interface UserContextValue {
  user: User | null;
  profile: any | null;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({
  value,
  children,
}: {
  value: UserContextValue;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be inside UserProvider');
  return ctx;
}
