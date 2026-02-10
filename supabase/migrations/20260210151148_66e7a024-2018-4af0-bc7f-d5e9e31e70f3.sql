-- Fix overly permissive INSERT policy: restrict field lengths via a validation trigger
-- This replaces the blanket WITH CHECK (true) with actual validation

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
DROP POLICY IF EXISTS "No public read access" ON public.leads;

-- Restrictive INSERT: still allow anonymous inserts but with server-side length constraints via trigger
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  WITH CHECK (
    char_length(name) <= 100
    AND char_length(phone) <= 20
    AND (email IS NULL OR char_length(email) <= 255)
    AND (company IS NULL OR char_length(company) <= 200)
  );

-- Keep reads blocked for anonymous users (service_role used in edge functions bypasses RLS)
CREATE POLICY "No public read access"
  ON public.leads FOR SELECT
  USING (false);
