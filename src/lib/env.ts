import { z } from "zod";

// Every variable is optional. An invalid value is treated as unset, and a
// warning names the variable (never its value). See specs/03 §10.4.

const warned = new Set<string>();

function warnOnce(name: string) {
  if (warned.has(name)) return;
  warned.add(name);
  console.warn(`[env] ${name} is set but invalid; treating it as unset.`);
}

function read<T>(name: string, raw: string | undefined, schema: z.ZodType<T>): T | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  const parsed = schema.safeParse(value);
  if (parsed.success) return parsed.data;
  warnOnce(name);
  return undefined;
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

const webhookUrl = z.url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" || (url.protocol === "http:" && LOCAL_HOSTS.has(url.hostname));
});

const siteUrl = z.url().refine((value) => /^https?:$/.test(new URL(value).protocol));

const phone = z.string().regex(/^\+?[0-9][0-9\s-]{6,18}$/);

/** Public values. NEXT_PUBLIC_* references are inlined at build time. */
export function getPublicEnv() {
  return {
    contactEmail: read("NEXT_PUBLIC_CONTACT_EMAIL", process.env.NEXT_PUBLIC_CONTACT_EMAIL, z.email()),
    contactPhone: read("NEXT_PUBLIC_CONTACT_PHONE", process.env.NEXT_PUBLIC_CONTACT_PHONE, phone),
    siteUrl: read("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL, siteUrl),
  };
}

/** Server-only values. Import only from server code (see lead-config.ts). */
export function getLeadWebhookUrl() {
  return read("LEAD_WEBHOOK_URL", process.env.LEAD_WEBHOOK_URL, webhookUrl);
}
