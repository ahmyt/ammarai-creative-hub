ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS confirmation_message_id text,
  ADD COLUMN IF NOT EXISTS confirmation_response text,
  ADD COLUMN IF NOT EXISTS confirmation_attempted_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmation_error text;

GRANT UPDATE (confirmation_status, confirmation_message_id, confirmation_response, confirmation_attempted_at, confirmation_error) ON public.contact_messages TO anon;