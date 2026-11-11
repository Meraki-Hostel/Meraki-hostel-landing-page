import { isLeadCaptureEnabled } from "@/lib/lead-config";
import { pageMetadata } from "@/lib/metadata";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Questions about plans, onboarding or support? Message the StayPookie team and we reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactForm enabled={isLeadCaptureEnabled()} />;
}
