"use client"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getUser as getUserAuth, getUserRole } from "@/lib/auth";
import { createClient } from "@/utils/supabase/client";

// shadcn/ui dropdown menu components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const user = await getUserAuth();
      if (user && user.email) {
        setEmail(user.email);
        const role = await getUserRole();
        if (role) {
          setRole(role);
        }
      } else {
        setEmail(null);
        setRole(null);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  const onLoginClick = () => {
    redirect('/login');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setEmail(null);
      setRole(null);
    } catch (e) {
      // fail silently
    }
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
        {loading ? (
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
