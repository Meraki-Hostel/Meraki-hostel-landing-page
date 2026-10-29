import "server-only";

import { legal } from "@/config/legal";
import { getLeadWebhookUrl, getPublicEnv } from "@/lib/env";

/**
 * Lead capture is live only when all three hold (owner decisions D-1/D-2, specs/03 §9.4):
 * a valid webhook, a real contact email, and a privacy notice marked reviewed in code.
 */
export function isLeadCaptureEnabled() {
  return Boolean(
    getLeadWebhookUrl() && getPublicEnv().contactEmail && legal.privacy.reviewStatus === "reviewed",
  );
}
