// Supabase is no longer used for data.
// File uploads are disabled — paste image URLs manually.
// See lib/api.ts for the new data API client.

const warn = (msg: string) => console.warn(`[Supabase Legacy] ${msg}`);

const uploadCache = new Map<string, string>();

export const supabase = {
  storage: {
    from: () => ({
      upload: async (path: string, file: File) => {
        try {
          const token = localStorage.getItem('token');
          const formData = new FormData();
          formData.append('file', file);
          
          const API_URL = import.meta.env.VITE_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:5000/api' : 'https://api.nexyovi.com/api');
          
          const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });
          
          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Upload failed');
          }
          
          const result = await response.json();
          // Cache the resulting URL against the requested path so getPublicUrl can retrieve it
          uploadCache.set(path, result.url);
          
          return { error: null };
        } catch (err: any) {
          console.error('Upload error:', err);
          return { error: err };
        }
      },
      getPublicUrl: (path: string) => {
        const publicUrl = uploadCache.get(path) || path;
        return { data: { publicUrl } };
      },
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
