import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twmkythtdrdmocfmifwx.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3bWt5dGh0ZHJkbW9jZm1pZnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzAyMDYsImV4cCI6MjA2OTgwNjIwNn0.3iFJJRioQQ5dgYkEQ5G2q0UDvh2sKO_BVI5_jyucs0o';

export const supabase = createClient(supabaseUrl, supabaseKey);
