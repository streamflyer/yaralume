import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import * as Linking from "expo-linking";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "./supabase";
import { handleAuthRedirect } from "./auth";
import { syncCheckIns } from "./checkins";

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  loading: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: authSub } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next);
      if (event === "SIGNED_IN") {
        syncCheckIns().catch((e) =>
          console.warn("[Yaralume] post sign-in sync failed", e)
        );
      }
    });

    function onUrl({ url }: { url: string }) {
      handleAuthRedirect(url).catch((e) =>
        console.warn("[Yaralume] magic link sign-in failed", e)
      );
    }
    const linkSub = Linking.addEventListener("url", onUrl);
    Linking.getInitialURL().then((url) => {
      if (url) onUrl({ url });
    });

    return () => {
      authSub.subscription.unsubscribe();
      linkSub.remove();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
