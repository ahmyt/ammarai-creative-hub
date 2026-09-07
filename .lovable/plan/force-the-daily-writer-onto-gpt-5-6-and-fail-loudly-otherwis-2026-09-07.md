# Force the daily writer onto GPT-5.6 (and fail loudly otherwise)

## What's actually happening

The writer code asks for `gpt-5.6-sol` by default, but it accepts an override:

```
const model = process.env["OPENAI_MODEL"]?.trim() || DEFAULT_MODEL;
```

So the only way a post gets written by `gpt-4o-mini` is that an `OPENAI_MODEL`
value of `gpt-4o-mini` is set in the environment where the writer ran (the
Plesk Node.js custom environment variables, most likely left over from the
earlier recommendation). Nothing in the code silently downgrades the model, and
OpenAI does not substitute a different model — an unavailable model returns an
error instead.

The code also never records which model actually produced a post, so today
there is no way to confirm this from inside the app. That gets fixed too.

## Changes (all in `src/lib/daily-blog.server.ts`)

1. **Only allow GPT-5.6 models.** Keep `gpt-5.6-sol` as the default. If
   `OPENAI_MODEL` is set to anything that is not in the `gpt-5.6` family
   (`gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`), stop immediately and throw
   `Something went wrong and the content wasn't generated.` — no post is
   written, no fallback model is used.
2. **Verify the model that actually answered.** The OpenAI response includes the
   model it served. If that value does not start with `gpt-5.6`, discard the
   result and throw the same message. Nothing is saved to the blog.
3. **Any OpenAI failure is fatal, not silent.** Rate limits, refusals, non-OK
   statuses, and unparseable output all surface as
   `Something went wrong and the content wasn't generated.` (the underlying
   status is logged on the server for diagnosis, not shown to visitors).
4. Because 5.6 models use `max_completion_tokens` rather than `max_tokens`, no
   token cap is added — the current request sets none, so nothing changes there.

The rest of the file — tool picking, JSON schema, HTML building, category
images, FAQs, JSON-LD, database save — stays exactly as it is.

## Documentation

Update the Plesk environment note in `SELF_HOSTING.md`: `OPENAI_MODEL` is
optional and, if set at all, must be one of the `gpt-5.6-*` names; any other
value now stops generation instead of quietly using a weaker model.

## What you need to do on the live server

Remove (or correct) `OPENAI_MODEL` in Plesk → Node.js → Custom environment
variables. Leaving it unset is the safest option — the writer then uses
`gpt-5.6-sol`. Restart the app afterwards.

## Verification

1. Typecheck passes.
2. With no `OPENAI_MODEL` set, the admin "Write today's post" action produces a
   post and the served model is a `gpt-5.6` one.
3. With `OPENAI_MODEL=gpt-4o-mini`, the action fails with "Something went wrong
   and the content wasn't generated." and no article row is created.

## Out of scope

- BabyLoveGrowth sync, cron schedule and URLs, existing published posts.
- Rewriting the post that was already generated with `gpt-4o-mini` (say the word
  and I can delete or regenerate it separately).
