/**
 * Supabase Browser Client Stub
 * Ready for integration once Supabase credentials are configured in .env.local.
 *
 * Requirements for future activation:
 * npm install @supabase/supabase-js @supabase/ssr
 */

export const isSupabaseConfigured = (): boolean => {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  // Will initialize createBrowserClient when packages are connected
  return null;
};
