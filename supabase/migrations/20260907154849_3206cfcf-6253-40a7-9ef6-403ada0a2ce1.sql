INSERT INTO public.sync_settings (id, interval_hours) VALUES ('daily-blog', 24)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.sync_cron_tokens (id) VALUES ('daily-blog')
ON CONFLICT (id) DO NOTHING;

SELECT cron.schedule(
  'daily-blog-writer',
  '23 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://ammarai.com/api/public/cron/daily-blog',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (SELECT token::text FROM public.sync_cron_tokens WHERE id = 'daily-blog'),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);