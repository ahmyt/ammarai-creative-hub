CREATE POLICY "Admins can insert articles"
  ON public.syndicated_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
