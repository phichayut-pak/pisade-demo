"use client"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearProfile } from "@/redux/profile";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  
  // Get profile data from Redux store
  const { profile, isLoading } = useSelector((state: RootState) => state.profile);
  
  const email = profile?.email || profile?.id || null;
  const role = profile?.role || null;

  const onLoginClick = () => {
    redirect('/login');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Clear Redux state
    dispatch(clearProfile());
    // drop the cache too, just to be safe
    queryClient.removeQueries({ queryKey: ["profile"] });
    queryClient.removeQueries({ queryKey: ["session"] });
    // send them back to login
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {email && (
        <div className="absolute top-4 right-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm text-gray-700 font-medium bg-gray-100 px-4 py-2 rounded shadow hover:bg-gray-200 transition">
                {email}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>
                {role}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className="flex flex-col gap-3 items-center justify-center w-1/2">
        {isLoading ? (
          <div className="text-lg text-gray-500">Loading...</div>
        ) : email && role ? (
          <div className="text-3xl font-bold text-black">
            Your role: <span className="text-blue-600">{role}</span>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="px-6 py-3 border rounded-xl text-black text-xl font-semibold hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
