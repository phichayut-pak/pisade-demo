"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile, setLoading, setError } from '@/redux/profile';
import { useSession } from '@/hooks/useSession';
import { useFetchProfile } from '@/hooks/useFetchProfile';

export default function UserProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { data: session, isLoading: sessionLoading } = useSession();
  const { data: profile, isLoading: profileLoading, error: profileError } = useFetchProfile();

  useEffect(() => {
    if (sessionLoading || profileLoading) {
      dispatch(setLoading(true));
      return;
    }

    if (profileError) {
      dispatch(setError(profileError.message || 'An error occurred'));
      return;
    }

    if (profile) {
      dispatch(setProfile(profile));
    }
    dispatch(setLoading(false));
  }, [dispatch, session, profile, sessionLoading, profileLoading, profileError]);

  return <>{children}</>;
}