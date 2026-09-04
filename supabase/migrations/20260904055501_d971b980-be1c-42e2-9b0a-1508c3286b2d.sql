ALTER TABLE public.content DROP CONSTRAINT content_kind_check;
ALTER TABLE public.content ADD CONSTRAINT content_kind_check CHECK (kind IN ('tool','use_case','feature','post','page'));