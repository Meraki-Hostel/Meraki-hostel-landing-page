import { brand } from "@/config/brand";
import type { IconName } from "@/components/ui/Icon";

// All landing-page copy and illustrative sample data (specs/01 §7, §9).
// Product statements use intent phrasing: nothing here is live yet (specs/06).

const name = brand.name;

export const PREVIEW_CAPTION = "Illustrative preview · sample data";
export const SAMPLE_PROPERTY = "Sample: Example Residency (demo)";

// ---------- Illustrative sample data (fictional people, fictional amounts) ----------

export type BedState = "occupied" | "vacant";
export type RoomSample = { room: string; beds: BedState[] };
export type PaymentStatus = "Paid" | "Due" | "Overdue";
export type RentRow = { tenant: string; room: string; amount: number; status: PaymentStatus; date: string };
export type TenantSample = { name: string; room: string; bed: string; since: string };
export type OpsItem = { title: string; detail: string; tag: string };

export const sample = {
  illustrative: true,
  rooms: [
    { room: "101", beds: ["occupied", "occupied", "vacant"] },
    { room: "102", beds: ["occupied", "occupied", "occupied"] },
    { room: "103", beds: ["occupied", "vacant"] },
    { room: "201", beds: ["occupied", "occupied", "occupied", "vacant"] },
    { room: "202", beds: ["vacant", "occupied"] },
    { room: "203", beds: ["occupied", "occupied", "occupied"] },
  ] satisfies RoomSample[],
  rent: [
    { tenant: "Aarav Sharma", room: "101-A", amount: 8500, status: "Paid", date: "02 Nov" },
    { tenant: "Priya Nair", room: "102-B", amount: 9000, status: "Paid", date: "03 Nov" },
    { tenant: "Rohan Gupta", room: "103-A", amount: 7500, status: "Due", date: "05 Nov" },
    { tenant: "Sneha Iyer", room: "201-C", amount: 8000, status: "Overdue", date: "28 Oct" },
    { tenant: "Kabir Singh", room: "203-A", amount: 9500, status: "Paid", date: "04 Nov" },
  ] satisfies RentRow[],
  tenants: [
    { name: "Ananya Rao", room: "102", bed: "B", since: "Jun 2026" },
    { name: "Vikram Joshi", room: "201", bed: "A", since: "Aug 2026" },
    { name: "Meera Pillai", room: "203", bed: "C", since: "Sep 2026" },
    { name: "Arjun Mehta", room: "101", bed: "B", since: "Oct 2026" },
  ] satisfies TenantSample[],
  ops: [
    { title: "Water purifier service", detail: "Ground floor · noted 3 Nov", tag: "To follow up" },
    { title: "Room 202 move-out", detail: "Bed A frees up on 15 Nov", tag: "This week" },
    { title: "Electricity meter reading", detail: "All floors · monthly record", tag: "Recorded" },
    { title: "New tenant documents", detail: "Room 103 · Bed B", tag: "To follow up" },
  ] satisfies OpsItem[],
  dashboard: {
    tiles: [
      { label: "Total beds", value: "48" },
      { label: "Occupied", value: "41" },
      { label: "Vacant", value: "7" },
      { label: "Dues outstanding", value: "₹38,000" },
    ],
    summary:
      "Sample dashboard for a fictional hostel showing bed counts, outstanding dues, recently recorded payments and dues to follow up.",
  },
};

// ---------- Sections ----------

export const content = {
  hero: {
    title: brand.tagline,
    lead: "Being built to keep occupancy, rent records, tenant information and everyday hostel operations organized in one place.",
    note: `${name} is in early access and not available yet.`,
    tickerLabel: "What we're building",
    ticker: [
      "Rooms",
      "Beds",
      "Occupancy",
      "Tenant records",
      "Allocations",
      "Monthly rent",
      "Recorded payments",
      "Outstanding dues",
      "Move-ins",
      "Move-outs",
      "Property notes",
    ],
  },
  problem: {
    title: "Running a hostel shouldn't mean chasing information across multiple tools.",
    lead: "Most owners keep the business running from memory and a handful of tools that don't talk to each other.",
    items: [
      { icon: "notebook", label: "Notebooks", text: "Records are fragmented across registers and loose pages." },
      { icon: "table", label: "Spreadsheets", text: "Rent is tracked by hand, one row and one month at a time." },
      { icon: "chat", label: "Chat messages", text: "Who moved in, who moved out: occupancy gets unclear." },
      { icon: "brain", label: "Memory", text: "The same follow-ups get repeated every single month." },
    ] satisfies { icon: IconName; label: string; text: string }[],
  },
  outcomes: {
    title: "Three things you should always know",
    lead: `${name} is designed around the questions owners ask every day.`,
    cards: [
      {
        id: "occupancy",
        title: "Know your occupancy",
        body: "Designed to keep room and bed availability visible and organized.",
      },
      {
        id: "rent",
        title: "Track rent with clarity",
        body: "Designed to help you review recorded payments and outstanding dues.",
      },
      {
        id: "records",
        title: "Keep operations organized",
        body: "Designed to make tenant and property information easier to find.",
      },
    ],
  },
  platform: {
    title: "Everything your hostel needs to stay organized.",
    tabs: [
      {
        id: "rooms",
        label: "Rooms & occupancy",
        description:
          "Set up rooms and beds once, then see which beds are occupied and which are vacant without walking the corridors.",
      },
      {
        id: "tenants",
        label: "Tenants & allocations",
        description:
          "Keep each tenant's details with the room and bed they're allocated, so allocations stay clear when people move.",
      },
      {
        id: "rent",
        label: "Rent & payments",
        description:
          "Record what's due each month and the payments you receive, and see who still has dues outstanding. Payments are recorded by you.",
      },
      {
        id: "operations",
        label: "Property operations",
        description:
          "Note the everyday things that need doing around the property, so nothing depends on someone remembering it.",
      },
    ],
  },
  attention: {
    title: "Know what needs your attention.",
    lead: "One view, designed to surface what matters this week, before it becomes a problem.",
    items: [
      { label: "Vacant beds", text: "Which beds are free to fill right now." },
      { label: "Dues outstanding", text: "Which tenants still owe rent this month." },
      { label: "Move-ins and move-outs", text: "Who arrives and who leaves this week." },
      { label: "Notes to follow up", text: "Property tasks you wrote down and haven't closed." },
    ],
  },
  features: {
    title: "A closer look at what we're building",
    lead: "The core of the product, in the order owners asked us for it.",
    rows: [
      {
        id: "occupancy",
        eyebrow: "Occupancy & rooms",
        title: "Every room and bed, in one picture.",
        body: "Designed for owners who still count beds on paper.",
        bullets: [
          "Rooms and beds set up the way your property is laid out",
          "Occupied and vacant beds at a glance",
          "Move-ins and move-outs that update the picture",
        ],
      },
      {
        id: "rent",
        eyebrow: "Rent & payment records",
        title: "A clear record of what's paid and what's due.",
        body: "Designed to replace the monthly spreadsheet, not your bank.",
        bullets: [
          "Monthly rent due for each tenant",
          "Payments recorded by you as they come in",
          "Outstanding dues listed in one place",
        ],
      },
      {
        id: "records",
        eyebrow: "Tenant & property records",
        title: "The details you look up, where you can find them.",
        body: "Designed so tenant and property information isn't scattered across chats.",
        bullets: [
          "Tenant details alongside their room and bed",
          "Property notes and everyday records",
          "One place instead of registers and messages",
        ],
      },
    ],
  },
  howItWorks: {
    title: "How it works",
    lead: `${name} follows the month you already run. It doesn't connect to banks, payment apps or messaging tools.`,
    steps: ["New tenant", "Allocate a bed", "Record rent", "Follow up dues", "Move-out"],
    rowsLead: "Designed to keep in one place",
    rows: [
      {
        label: "Rooms & tenants",
        direction: "ltr",
        duration: 60,
        items: ["Room register", "Bed allocation", "Vacant beds", "Tenant details", "Move-in dates", "Move-out dates", "Room changes", "Occupancy history"],
      },
      {
        label: "Rent & records",
        direction: "rtl",
        duration: 44,
        items: ["Rent due", "Payments recorded", "Outstanding dues", "Monthly summary", "Deposit notes", "Property notes", "Follow-ups", "Everyday records"],
      },
    ] as const,
  },
  gettingStarted: {
    title: "Getting started should be simple.",
    lead: "Early access is personal. A person on our team reads every request.",
    steps: [
      { title: "You request early access.", body: "Share a few details about your property using the form below." },
      { title: "We review your request.", body: "Our team reads each request to understand who it's from and what you need." },
      {
        title: "We contact you.",
        body: "After reviewing it, we get in touch to learn how you run your property today.",
      },
      {
        title: "You help shape what we build.",
        body: "Your feedback decides what we build first and how it works.",
      },
    ],
  },
  why: {
    title: `Why ${name}`,
    lead: "Built around one kind of business, by listening to the people who run it.",
    cards: [
      {
        icon: "bed",
        title: "Built for hostels & PGs",
        body: "Rooms, beds, tenants and monthly rent: the way hostels and PGs actually work.",
      },
      {
        icon: "layout",
        title: "Everything in one place",
        body: "Designed to replace the mix of registers, spreadsheets and chat threads.",
      },
      {
        icon: "eye",
        title: "Clear view of occupancy & dues",
        body: "Designed to show what's vacant and what's outstanding without counting by hand.",
      },
      {
        icon: "handshake",
        title: "Shaped with operators",
        body: "Owners who join early access help decide what gets built and how.",
      },
    ] satisfies { icon: IconName; title: string; body: string }[],
  },
  earlyAccess: {
    title: "Help us build a better way to manage hostels.",
    lead: `Join the ${name} early-access list and help shape a simpler way to manage hostel and PG operations.`,
    afterSubmit: "Our team reviews every request and will contact you after reviewing it. We can't promise a demo or an onboarding date yet.",
    notice:
      "We use these details only to review your request and contact you about early access. You can withdraw your consent at any time.",
    success: {
      title: "Thank you — your request has reached us.",
      body: "Our team will contact you after reviewing it. We'll use these details only for that.",
    },
    disabled: {
      title: "Our early-access form isn't connected yet.",
      withContact: "You can still reach us directly:",
      withoutContact: "Please check back soon. The form will open once it's ready to receive requests.",
    },
    errors: {
      invalid: "Please fix the following",
      rejected: "We couldn't accept this submission. Please reload the page and try again.",
      notConfigured: "Our early-access form isn't connected yet.",
      upstream: "We couldn't send your request. Your details are still here — please try again.",
      rateLimited: "Too many attempts. Please wait a minute and try again.",
    },
    fields: {
      name: { label: "Full name", placeholder: "" },
      property: { label: "Property or business name", placeholder: "" },
      contactLegend: "How can we reach you? Enter at least one.",
      phone: { label: "Mobile number", placeholder: "e.g. 98765 43210" },
      email: { label: "Email", placeholder: "e.g. name@example.com" },
      city: { label: "City", placeholder: "e.g. Pune" },
      beds: {
        label: "Approx. number of beds",
        placeholder: "Choose a range",
        options: [
          { value: "under-20", label: "Under 20" },
          { value: "20-50", label: "20–50" },
          { value: "51-150", label: "51–150" },
          { value: "over-150", label: "More than 150" },
        ],
      },
      properties: {
        label: "Number of properties",
        placeholder: "Choose one",
        options: [
          { value: "1", label: "1" },
          { value: "2-3", label: "2–3" },
          { value: "4+", label: "4 or more" },
        ],
      },
      challenge: { label: "Your biggest operational challenge", placeholder: "" },
      consent: `I agree that the ${name} team may use these details to contact me about early access, as described in the`,
      consentLink: "privacy notice",
    },
  },
  faq: {
    title: "Questions, answered honestly",
    items: [
      {
        q: `What is ${name}?`,
        a: `${name} is hostel and PG management software being built for owners and operators in India. It's designed to keep rooms and beds, occupancy, tenant records, rent records and outstanding dues organized in one place. It isn't available yet: we're opening early access and building it with the operators who join.`,
      },
      {
        q: `Who is ${name} built for?`,
        a: `People who run hostels and PGs: independent PG owners, hostel owners, small and medium operators, property managers and the administrators who handle day-to-day operations. ${name} is not a site for finding accommodation, and it isn't designed for tenants.`,
      },
      {
        q: "Can I track rent and outstanding payments?",
        a: `That's a core part of what we're building: recording the rent due each month and the payments you receive, and showing which tenants have dues outstanding. Payments are recorded by you. ${name} doesn't collect rent or process payments.`,
      },
      {
        q: "Can I manage rooms and bed occupancy?",
        a: `That's central to what ${name} is being built to do: set up your rooms and beds, allocate tenants to beds, and see which beds are occupied and which are vacant. Operators who join early access will help us shape how it works.`,
      },
      {
        q: "Can I manage multiple properties?",
        a: "We're exploring it. If you run more than one property, tell us in the early-access form. It helps us decide how to support it.",
      },
      {
        q: `Does ${name} automatically reconcile UPI payments?`,
        a: `No. ${name} won't connect to UPI apps, payment gateways or bank accounts. Payments are recorded by you.`,
      },
      {
        q: `Can tenants use ${name} directly?`,
        a: `No. ${name} is for owners and operators. There's no tenant app or portal, and tenants can't apply or pay through it.`,
      },
      {
        q: "How can I get early access?",
        a: "Fill in the early-access form on this page with a few details about your property. Our team reviews each request and will contact you after reviewing it. We can't promise a demo or an onboarding date yet.",
        link: { label: "Go to the early-access form", href: "#early-access" },
      },
    ],
  },
  finalCta: {
    title: "Make hostel management simpler.",
    lead: `Get early access to ${name} and help shape a better way to manage hostel operations.`,
  },
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Platform", href: "/#platform" },
          { label: "Features", href: "/#features" },
          { label: "How it works", href: "/#how-it-works" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Early access", href: "/#early-access" },
          { label: "Contact", href: "/#early-access" },
          { label: "FAQ", href: "/#faq" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ],
    statement: `${name} is in early access. Product screens on this site are illustrative and use sample data.`,
  },
};
