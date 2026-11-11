/**
 * Site-wide feature flags.
 *
 * `showPricing` — while StayPookie is sourcing design partners rather than
 * selling directly, the ₹ amounts are hidden from the public marketing
 * pages (homepage pricing teaser, /pricing cards and comparison table).
 * Flip to `true` once prices can be disclosed again.
 *
 * This does not touch /checkout: a visitor who already has a checkout link
 * must still see the exact amount they are being charged.
 */
export const flags = {
  showPricing: false,
};

/** Shown in place of a ₹ amount wherever `flags.showPricing` is false. */
export const pricingFallbackLabel = "Contact us for pricing";
