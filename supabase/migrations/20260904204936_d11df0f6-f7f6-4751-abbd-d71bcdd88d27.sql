CREATE TABLE public.syndicated_articles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  external_id text,
  title text NOT NULL,
  content_html text,
  content_markdown text,
  meta_description text,
  hero_image_url text,
  json_ld jsonb,
  faq_json_ld jsonb,
  language_code text NOT NULL DEFAULT 'en',
  published_at timestamp with time zone,
  synced_at timestamp with time zone NOT NULL DEFAULT now(),
  is_hidden boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.syndicated_articles TO anon;
GRANT SELECT, UPDATE ON public.syndicated_articles TO authenticated;
GRANT ALL ON public.syndicated_articles TO service_role;

ALTER TABLE public.syndicated_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible articles"
  ON public.syndicated_articles FOR SELECT
  TO anon, authenticated
  USING (is_hidden = false);

CREATE POLICY "Admins can read all articles"
  ON public.syndicated_articles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update articles"
  ON public.syndicated_articles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX syndicated_articles_published_at_idx
  ON public.syndicated_articles (published_at DESC);

CREATE TRIGGER syndicated_articles_set_updated_at
  BEFORE UPDATE ON public.syndicated_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();