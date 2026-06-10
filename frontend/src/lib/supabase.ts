// Supabase is no longer used for data.
// File uploads are disabled — paste image URLs manually.
// See lib/api.ts for the new data API client.

const warn = (msg: string) => console.warn(`[Supabase Legacy] ${msg}`);

export const supabase = {
  storage: {
    from: () => ({
      upload: async () => {
        warn('File upload is not available. Paste an image URL instead.');
        return { error: new Error('Upload disabled') };
      },
      getPublicUrl: () => ({
        data: { publicUrl: '' },
      }),
    }),
  },
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: null, error: new Error('Auth disabled — use the local login instead.') }),
    signOut: async () => {},
  },
  from: () => ({
    select: () => ({
      order: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Supabase disabled') }),
        }),
      }),
    }),
    insert: () => ({ select: () => ({}) }),
    update: () => ({ eq: () => ({ select: () => ({}) }) }),
    delete: () => ({ eq: () => ({}) }),
  }),
  channel: () => ({
    on: () => ({ subscribe: () => {} }),
  }),
  removeChannel: () => {},
};
