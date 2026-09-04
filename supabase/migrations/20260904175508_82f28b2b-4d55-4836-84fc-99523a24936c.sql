ALTER TABLE public.contact_messages
  ADD COLUMN confirmation_status text NOT NULL DEFAULT 'not_sent'
  CHECK (confirmation_status IN ('sent', 'failed', 'not_sent'));