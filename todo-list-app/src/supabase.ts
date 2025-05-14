import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://czbaypcuvaogfzocllby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6YmF5cGN1dmFvZ2Z6b2NsbGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ3NDgsImV4cCI6MjA2MjgwMDc0OH0.Q0tIBlqH8fJC-f0Mk-tAOKHfco4ddyHPAg4zOJM357M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);