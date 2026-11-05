// src/supabaseHelpers.js

const isMissingColumnError = (error) =>
  !!error && (error.code === 'PGRST204' || error.code === '42703' || /column/i.test(error.message || ''));

// Runs `execute(payload)`. If Supabase rejects it because an optional column does not
// exist yet (e.g. the SQL in supabase/schema_updates.sql has not been run), the
// request is retried once without those optional columns so the core flow keeps working.
export async function runWithOptionalColumns(execute, payload, optionalKeys) {
  let result = await execute(payload);

  if (result.error && isMissingColumnError(result.error)) {
    const trimmed = { ...payload };
    optionalKeys.forEach((key) => delete trimmed[key]);

    if (Object.keys(trimmed).length !== Object.keys(payload).length) {
      console.warn(
        'Optional columns missing in Supabase, retrying without them:',
        optionalKeys.join(', '),
        '(see supabase/schema_updates.sql)'
      );
      result = await execute(trimmed);
    }
  }

  return result;
}
