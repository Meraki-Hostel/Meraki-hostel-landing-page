import { pageMetadata } from "@/lib/metadata";
import CheckoutPage from "./CheckoutClient";

export const metadata = pageMetadata({
  title: "Checkout",
  description:
    "Confirm your StayPookie plan and pay securely via Razorpay. Account setup and login are emailed within 24 hours of payment.",
  path: "/checkout",
  noindex: true,
});

export default CheckoutPage;
