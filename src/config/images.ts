import type { StaticImageData } from "next/image";
import heroHostelRoom from "@/assets/photos/hero-hostel-room.jpg";
import ctaPhoneCall from "@/assets/photos/cta-phone-call.jpg";
import stepRequest from "@/assets/photos/step-request.jpg";
import stepReview from "@/assets/photos/step-review.jpg";
import stepContact from "@/assets/photos/step-contact.jpg";
import stepFeedback from "@/assets/photos/step-feedback.jpg";

// Stock photography from Unsplash (free Unsplash License; downloaded 2026-10-29 via the
// official download links). These are not Meraki customers, staff or properties.

export type Photo = {
  src: StaticImageData;
  alt: string;
  credit: { name: string; url: string };
};

const unsplash = (id: string) => `https://unsplash.com/photos/${id}`;

export const photos = {
  hero: {
    src: heroHostelRoom,
    alt: "A sunlit hostel dormitory with wooden bunk beds along one wall",
    credit: { name: "Zoshua Colah", url: unsplash("TzMGehZmocI") },
  },
  finalCta: {
    src: ctaPhoneCall,
    alt: "A man in glasses talking on the phone at his desk",
    credit: { name: "Vitaly Gariev", url: unsplash("jJCmXQajQWI") },
  },
  steps: [
    {
      src: stepRequest,
      alt: "A woman filling in details on her laptop at a desk",
      credit: { name: "Zulfugar Karimov", url: unsplash("AiGYxUwJQog") },
    },
    {
      src: stepReview,
      alt: "A small team at work in a bright office",
      credit: { name: "Vitaly Gariev", url: unsplash("rrE2NMMxJX0") },
    },
    {
      src: stepContact,
      alt: "A man on a phone call at a desk with a laptop",
      credit: { name: "Daniil Onischenko", url: unsplash("ty640jWbmIY") },
    },
    {
      src: stepFeedback,
      alt: "Two people talking across a table by a window",
      credit: { name: "Christina @ wocintechchat.com", url: unsplash("LQ1t-8Ms5PY") },
    },
  ],
} satisfies { hero: Photo; finalCta: Photo; steps: Photo[] };

/** Unique photographers, for the footer credit line. */
export const photoCredits = [photos.hero, photos.finalCta, ...photos.steps]
  .map((photo) => photo.credit)
  .filter((credit, index, all) => all.findIndex((c) => c.name === credit.name) === index);
