// components/UserProvider.tsx
import { createClient } from '@/utils/supabase/server';
import { UserProvider as ContextProvider } from '@/context/UserContext';
import type { ReactNode } from 'react';

export default async function UserProvider({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (!error) profile = data;
  }

  return (
    <ContextProvider value={{ user, profile }}>
      {children}
    </ContextProvider>
  );
}