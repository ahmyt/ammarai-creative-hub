CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE public.sync_settings (
  id text PRIMARY KEY,
  interval_hours integer NOT NULL DEFAULT 24 CHECK (interval_hours >= 1),
  last_run_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.sync_settings (id, interval_hours) VALUES ('babylovegrowth', 24);

GRANT SELECT, UPDATE ON public.sync_settings TO authenticated;
GRANT ALL ON public.sync_settings TO service_role;
ALTER TABLE public.sync_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view sync settings" ON public.sync_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update sync settings" ON public.sync_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.sync_cron_tokens (
  id text PRIMARY KEY,
  token uuid NOT NULL DEFAULT gen_random_uuid()
);
INSERT INTO public.sync_cron_tokens (id) VALUES ('babylovegrowth');

GRANT ALL ON public.sync_cron_tokens TO service_role;
ALTER TABLE public.sync_cron_tokens ENABLE ROW LEVEL SECURITY;

SELECT cron.schedule(
  'babylovegrowth-sync',
  '7 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://ammarai.com/api/public/cron/babylovegrowth',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (SELECT token::text FROM public.sync_cron_tokens WHERE id = 'babylovegrowth'),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);