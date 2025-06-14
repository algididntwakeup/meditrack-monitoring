// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Ambil environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lakukan validasi sederhana untuk memastikan variabel tidak kosong
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

// Buat dan ekspor instance klien Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);