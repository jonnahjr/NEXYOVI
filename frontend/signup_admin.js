import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://kgokqftntqszjnwsaegj.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_4nTyvuNSS_nzK1ysysxpAA_lp4e-c1R';

const supabase = createClient(supabaseUrl, supabaseKey);

async function signUpAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@nexyovi.com',
    password: 'Jonnahjnr@0945628075',
    options: {
      data: {
        full_name: 'Yonas Bogale'
      }
    }
  });

  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('Successfully created admin user!');
    console.log(data);
  }
}

signUpAdmin();
