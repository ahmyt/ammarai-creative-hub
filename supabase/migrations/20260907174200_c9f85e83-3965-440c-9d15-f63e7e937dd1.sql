-- 1. Lock down SECURITY DEFINER routines
REVOKE ALL ON FUNCTION public.record_contact_confirmation(uuid, text, text, text, text, timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_contact_confirmation(uuid, text, text, text, text, timestamptz) TO service_role;

REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO service_role;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2. sync_cron_tokens: privileged server access only
REVOKE ALL ON TABLE public.sync_cron_tokens FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.sync_cron_tokens TO service_role;
ALTER TABLE public.sync_cron_tokens ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No client access to cron tokens" ON public.sync_cron_tokens;
CREATE POLICY "No client access to cron tokens"
  ON public.sync_cron_tokens FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

-- 3. user_roles: no cross-user visibility
DROP POLICY IF EXISTS "Authenticated users can read roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));