import type { StaticImageData } from "next/image";
import heroHostelRoom from "@/assets/photos/hero-hostel-room.jpg";
import ctaPhoneCall from "@/assets/photos/cta-phone-call.jpg";
import stepRequest from "@/assets/photos/step-request.jpg";
import stepReview from "@/assets/photos/step-review.jpg";
import stepContact from "@/assets/photos/step-contact.jpg";
import stepFeedback from "@/assets/photos/step-feedback.jpg";
import mascotStudent from "@/assets/mascots/student.jpg";
import mascotOwner from "@/assets/mascots/owner.jpg";
import mascotSupport from "@/assets/mascots/support.jpg";
import logoMark from "@/assets/logo/mark.png";

// Stock photography from Unsplash (free Unsplash License; downloaded 2026-10-29 via the
// official download links). These are not customer, staff or property photos.

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
      credit: {
        name: "Christina @ wocintechchat.com",
        url: unsplash("LQ1t-8Ms5PY"),
      },
    },
  ],
} satisfies { hero: Photo; finalCta: Photo; steps: Photo[] };

// Hand-drawn role mascots (owner/student/support), supplied directly as brand
// illustration — not stock photography, so no attribution entry is needed.
export const mascots = {
  student: { src: mascotStudent, alt: "Illustrated mascot of a student" },
  owner: { src: mascotOwner, alt: "Illustrated mascot of a property owner" },
  support: {
    src: mascotSupport,
    alt: "Illustrated mascot of a support team member",
  },
};

// Real brand logo (supplied directly, background removed) — not stock
// photography, so no attribution entry is needed.
export const logo = {
  src: logoMark,
  alt: "StayPookie logo mark",
};

/** Unique photographers, for the footer credit line. */
export const photoCredits = [photos.hero, photos.finalCta, ...photos.steps]
  .map((photo) => photo.credit)
  .filter(
    (credit, index, all) =>
      all.findIndex((c) => c.name === credit.name) === index,
  );
