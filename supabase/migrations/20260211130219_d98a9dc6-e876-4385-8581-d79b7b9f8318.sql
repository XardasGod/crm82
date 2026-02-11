ALTER TABLE public.leads ADD COLUMN source text DEFAULT 'main';

-- Update RLS policy to allow source field
DROP POLICY "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead" ON public.leads
FOR INSERT
WITH CHECK (
  (char_length(name) <= 100) AND
  (char_length(phone) <= 20) AND
  ((email IS NULL) OR (char_length(email) <= 255)) AND
  ((company IS NULL) OR (char_length(company) <= 200)) AND
  ((source IS NULL) OR (char_length(source) <= 50))
);