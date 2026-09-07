UPDATE public.syndicated_articles
SET content_html = replace(content_html, 'https://ammarai-creative-hub.lovable.app', 'https://ammarai.com'),
    content_markdown = replace(content_markdown, 'https://ammarai-creative-hub.lovable.app', 'https://ammarai.com')
WHERE content_html ILIKE '%ammarai-creative-hub.lovable.app%'
   OR content_markdown ILIKE '%ammarai-creative-hub.lovable.app%';

UPDATE public.syndicated_articles
SET content_html = replace(content_html, 'https://id-preview--ab4a5e87-30cb-4379-b661-4f70b8317377.lovable.app', 'https://ammarai.com'),
    content_markdown = replace(content_markdown, 'https://id-preview--ab4a5e87-30cb-4379-b661-4f70b8317377.lovable.app', 'https://ammarai.com')
WHERE content_html ILIKE '%id-preview--ab4a5e87-30cb-4379-b661-4f70b8317377.lovable.app%'
   OR content_markdown ILIKE '%id-preview--ab4a5e87-30cb-4379-b661-4f70b8317377.lovable.app%';