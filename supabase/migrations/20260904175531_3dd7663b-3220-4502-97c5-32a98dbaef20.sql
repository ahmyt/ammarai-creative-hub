GRANT UPDATE (confirmation_status) ON public.contact_messages TO anon;

CREATE POLICY "Submitter flow can set confirmation status"
  ON public.contact_messages
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);