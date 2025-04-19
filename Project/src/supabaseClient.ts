import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxwpmaxuhjxjmtprsrrz.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4d3BtYXh1aGp4am10cHJzcnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDYyNzEsImV4cCI6MjA2MDQ4MjI3MX0.7KKEvdcDLEuuUDgdbiCHOBBdaBUgkFcJNIJ2xyVmd9M'; // 🔁 Replace this with your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
