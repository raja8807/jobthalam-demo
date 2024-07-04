import { createBrowserClient } from '@supabase/ssr'
// import { createClient as _createClient } from "@supabase/supabase-js";
// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = "https://ajzdywapgtvklcdunsou.supabase.co";
// // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqemR5d2FwZ3R2a2xjZHVuc291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0NjY0NDcsImV4cCI6MjAzNTA0MjQ0N30.OtSIGEXQfC4-Fnr_7kbtpan_XI30_IAlQCDAMouiEQw";


// const client = _createClient(supabaseUrl, supabaseKey);

// export const createClient = () => client;


export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}

