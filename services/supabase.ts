import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ltnfertszaoqvauizzbr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0bmZlcnRzemFvcXZhdWl6emJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NjA5NDgsImV4cCI6MjA5NDUzNjk0OH0.LoMe8Bq4ZB_BqzBbWyWljxzGugtFRPMV_Rb9eSqvVD8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
