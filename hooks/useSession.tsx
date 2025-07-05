import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export function useSession() {
    const supabase = createClient();
    return useQuery({
        queryKey: ["session"],
        queryFn: () => supabase.auth.getSession().then(r => r.data.session),
        staleTime: Infinity,
    });
}