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
export type RentRow = {
  tenant: string;
  room: string;
  amount: number;
  status: PaymentStatus;
  date: string;
};
export type TenantSample = {
  name: string;
  room: string;
  bed: string;
  since: string;
};
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
    {
      tenant: "Aarav Sharma",
      room: "101-A",
      amount: 8500,
      status: "Paid",
      date: "02 Nov",
    },
    {
      tenant: "Priya Nair",
      room: "102-B",
      amount: 9000,
      status: "Paid",
      date: "03 Nov",
    },
    {
      tenant: "Rohan Gupta",
      room: "103-A",
      amount: 7500,
      status: "Due",
      date: "05 Nov",
    },
    {
      tenant: "Sneha Iyer",
      room: "201-C",
      amount: 8000,
      status: "Overdue",
      date: "28 Oct",
    },
    {
      tenant: "Kabir Singh",
      room: "203-A",
      amount: 9500,
      status: "Paid",
      date: "04 Nov",
    },
  ] satisfies RentRow[],
  tenants: [
    { name: "Ananya Rao", room: "102", bed: "B", since: "Jun 2026" },
    { name: "Vikram Joshi", room: "201", bed: "A", since: "Aug 2026" },
    { name: "Meera Pillai", room: "203", bed: "C", since: "Sep 2026" },
    { name: "Arjun Mehta", room: "101", bed: "B", since: "Oct 2026" },
  ] satisfies TenantSample[],
  ops: [
    {
      title: "Water purifier service",
      detail: "Ground floor · noted 3 Nov",
      tag: "To follow up",
    },
    {
      title: "Room 202 move-out",
      detail: "Bed A frees up on 15 Nov",
      tag: "This week",
    },
    {
      title: "Electricity meter reading",
      detail: "All floors · monthly record",
      tag: "Recorded",
    },
    {
      title: "New tenant documents",
      detail: "Room 103 · Bed B",
      tag: "To follow up",
    },
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
    badge: "Hostel & PG Management SaaS for India",
    headlineProblem:
      "Manual rent tracking and zero visibility across properties belong in the past.",
    headlineResolution:
      "Run every bed, rent payment, and tenant record with complete clarity.",
    lead: "Built specifically for hostel and PG owners across India. Choose your plan, and our team configures your property, rooms, and billing records directly so you are operational on day one.",
    primaryCta: { label: "See Plans", href: "/pricing" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    previewLabel: "Live Owner Dashboard · Real Property Overview",
    previewCaption: "Product Screenshot Placeholder",
    tickerLabel: "Core Capabilities",
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
    badge: "The Everyday Chaos",
    title: "Running a hostel shouldn't mean chasing information across tools.",
    lead: "When rent notes, room registers, and tenant requests live in scattered places, you spend more time investigating confusion than running your business.",
    cards: [
      {
        id: "whatsapp-rent",
        icon: "chat" as IconName,
        title: "Rent tracked across three WhatsApp groups",
        body: "Screenshots of UPI transfers pile up in personal chats. You spend the first ten days of every month matching bank credits to tenant names, while unrecorded dues slip through the cracks.",
        tag: "Delayed collections",
        accent: "brick" as const,
      },
      {
        id: "hall-walking",
        icon: "bed" as IconName,
        title: "No idea which beds are free without walking the halls",
        body: "When an enquiry walks in, you have to call your warden, check a paper register, or physically check room keys. Empty beds sit vacant for days because nobody has an accurate headcount.",
        tag: "Lost vacancy revenue",
        accent: "amber" as const,
      },
      {
        id: "lost-records",
        icon: "notebook" as IconName,
        title: "No record of who approved what",
        body: "Security deposit refunds, notice periods, and maintenance agreements live in verbal promises or scattered notes. When staff changes or a tenant vacates, you are left with awkward arguments and zero proof.",
        tag: "Disputed deposits",
        accent: "slate-ink" as const,
      },
    ],
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
      {
        label: "Dues outstanding",
        text: "Which tenants still owe rent this month.",
      },
      {
        label: "Move-ins and move-outs",
        text: "Who arrives and who leaves this week.",
      },
      {
        label: "Notes to follow up",
        text: "Property tasks you wrote down and haven't closed.",
      },
    ],
  },
  features: {
    eyebrow: "Everything You Need",
    title: "Purpose-built tools for modern hostel & PG management.",
    lead: "Every capability is engineered to deliver immediate operational outcomes first, backed by dependable automation mechanisms.",
    groups: [
      {
        id: "billing",
        eyebrow: "Predictable Cashflow",
        title: "Billing",
        description:
          "Clear rent ledgers, automated invoices, and fast payment reconciliation without awkward conversations.",
        cards: [
          {
            id: "automatic-rent",
            title: "Automatic Monthly Rent",
            outcome:
              "Never calculate rent amounts by hand on the 1st of the month.",
            mechanism:
              "Recurring invoices generate automatically on the 1st based on assigned room rates, sharing tiers, and join dates.",
            icon: "rupee" as IconName,
            tag: "Recurring Invoicing",
            accent: "moss" as const,
          },
          {
            id: "late-fees",
            title: "Late Fees",
            outcome:
              "Encourage punctual payments without uncomfortable arguments.",
            mechanism:
              "Configurable grace periods automatically apply flat or per-day overdue penalties when rent passes the due date.",
            icon: "warning" as IconName,
            tag: "Configurable Penalties",
            accent: "amber" as const,
          },
          {
            id: "razorpay-payments",
            title: "Online Payment via Razorpay",
            outcome:
              "Residents clear dues in seconds from their phones without sending UPI screenshots.",
            mechanism:
              "Integrated Razorpay payment gateway accepts UPI, debit/credit cards, and net banking with instant transaction confirmation.",
            icon: "creditCard" as IconName,
            tag: "UPI & Cards",
            accent: "slate-ink" as const,
          },
          {
            id: "deposits-refunds",
            title: "Deposits & Refunds",
            outcome:
              "Eliminate move-in and check-out disputes over advance money.",
            mechanism:
              "Dedicated security deposit ledger tracks initial deposit receipts, approved maintenance deductions, and final payout records.",
            icon: "shield" as IconName,
            tag: "Deposit Balance",
            accent: "moss" as const,
          },
          {
            id: "pdf-receipts",
            title: "PDF Receipts",
            outcome:
              "Provide residents and parents with verified payment records immediately.",
            mechanism:
              "One-click digital PDF receipts complete with transaction IDs, property GST details, and timestamps are generated instantly.",
            icon: "fileText" as IconName,
            tag: "Downloadable PDF",
            accent: "slate-ink" as const,
          },
        ],
      },
      {
        id: "operations",
        eyebrow: "On-Ground Control",
        title: "Operations",
        description:
          "Keep staff coordinated, assets accounted for, and properties safe without paper logbooks.",
        cards: [
          {
            id: "complaints",
            title: "Complaints & Maintenance",
            outcome:
              "Fix plumbing, electrical, and room issues before residents get frustrated.",
            mechanism:
              "In-app ticket tracking organizes requests by category, sets priority levels, and logs staff resolution timestamps.",
            icon: "wrench" as IconName,
            tag: "Ticket Tracker",
            accent: "brick" as const,
          },
          {
            id: "leave-requests",
            title: "Leave Requests",
            outcome:
              "Always know who is on campus and who is away without paper registers.",
            mechanism:
              "Digital student out-pass applications capture departure dates, return times, emergency contact alerts, and warden approval status.",
            icon: "calendar" as IconName,
            tag: "Digital Pass",
            accent: "amber" as const,
          },
          {
            id: "visitors",
            title: "Visitor Logs",
            outcome:
              "Protect your property gates without messy paper visitor books.",
            mechanism:
              "Fast check-in logs visitor name, photo ID, contact details, host resident room number, and exit timestamps.",
            icon: "users" as IconName,
            tag: "Gate Security",
            accent: "slate-ink" as const,
          },
          {
            id: "routine-maintenance",
            title: "Maintenance Schedules",
            outcome:
              "Prevent sudden breakdowns and preserve property equipment value.",
            mechanism:
              "Preventative schedules track air conditioners, water purifiers, lift inspections, and generator routine servicing.",
            icon: "layout" as IconName,
            tag: "Asset Care",
            accent: "moss" as const,
          },
          {
            id: "inventory",
            title: "Inventory & Assets",
            outcome:
              "Never lose track of mattresses, keys, or consumable supplies.",
            mechanism:
              "Asset registry tracks per-room furniture allocations, appliance serial numbers, and store room inventory levels.",
            icon: "box" as IconName,
            tag: "Asset Registry",
            accent: "slate-ink" as const,
          },
        ],
      },
      {
        id: "communication",
        eyebrow: "Instant Broadcasts",
        title: "Communication",
        description:
          "Keep residents, wardens, and staff aligned with clear, targeted announcements.",
        cards: [
          {
            id: "targeted-notices",
            title: "Targeted Notices",
            outcome:
              "Deliver important updates to the right residents without spamming everyone.",
            mechanism:
              "Filtered announcement broadcasts publish to specific wings, floors, room types, or the entire property instantly.",
            icon: "bell" as IconName,
            tag: "Segmented Broadcast",
            accent: "slate-ink" as const,
          },
          {
            id: "emergency-alerts",
            title: "Emergency Alerts",
            outcome:
              "Broadcast urgent security or safety announcements within seconds.",
            mechanism:
              "High-priority banners pin directly to student screens with push notifications and audible warden alerts.",
            icon: "warning" as IconName,
            tag: "High Priority",
            accent: "brick" as const,
          },
          {
            id: "staff-management",
            title: "Staff Management",
            outcome:
              "Ensure wardens, security guards, and housekeeping teams know their daily priorities.",
            mechanism:
              "Role-based duty checklists, shift attendance logs, and property-specific task assignments.",
            icon: "users" as IconName,
            tag: "Role Assignments",
            accent: "moss" as const,
          },
        ],
      },
    ],
  },
  roles: {
    eyebrow: "Strict Role Scoping",
    title: "Built for every role",
    lead: "Data stays strictly scoped to each person's responsibilities. This is a real trust signal — everyone sees only what they need to do their job.",
    columns: [
      {
        id: "owner",
        title: "Owner",
        tagline: "Portfolio-wide view across all properties",
        badge: "Macro Portfolio Scope",
        accent: "slate-ink" as const,
        scopeStatement:
          "Complete financial and occupancy oversight across single or multiple properties.",
        whatTheySee: [
          "Consolidated revenue, collection percentage, and pending dues across all buildings",
          "Real-time occupancy rates, vacant bed counts, and branch capacity",
          "Property-wise manager performance metrics and verified operational logs",
          "Comprehensive financial reports, tax summaries, and audit trail exports",
        ],
        restrictedBoundary:
          "Never cluttered with daily repair chats or routine night-out leave submissions.",
      },
      {
        id: "warden",
        title: "Manager / Warden",
        tagline: "Runs one property day-to-day",
        badge: "Property Operational Scope",
        accent: "amber" as const,
        scopeStatement:
          "Smooth on-ground execution, instant room visibility, and calm daily property management.",
        whatTheySee: [
          "Live floor-wise bed allocation map for their assigned property only",
          "Daily tenant check-in verification, move-outs, and rent due follow-ups",
          "Maintenance tickets, cleaning assignments, and complaint resolution logs",
          "Digital visitor entries, student leave approvals, and curfew attendance",
        ],
        restrictedBoundary:
          "Strictly scoped to their assigned building; zero access to other properties or owner banking credentials.",
      },
      {
        id: "student",
        title: "Student / Resident",
        tagline: "Pays rent, raises complaints, requests leave, reads notices",
        badge: "Personal Account Scope",
        accent: "moss" as const,
        scopeStatement:
          "Frictionless living experience with transparent personal records and zero verbal disputes.",
        whatTheySee: [
          "Their personal room/bed allocation and agreed monthly rate breakdown",
          "Instant Razorpay rent payment button with automated PDF receipts",
          "One-tap complaint tracker with live repair updates and photo proof",
          "Digital leave request form with approval status and parent alert records",
          "Official property notices and emergency announcements",
        ],
        restrictedBoundary:
          "Sees strictly their personal account; zero access to other tenants' dues, phone numbers, or property financial data.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Fast & Predictable Setup",
    title: "How It Works",
    lead: "Go from scattered registers to a calm, automated property in four straightforward steps.",
    steps: [
      {
        step: "01",
        title: "Add your property",
        outcome: "Map your layout accurately in minutes.",
        description:
          "Input your building floors, rooms, and bed configurations (single, double, triple, or dorm sharing) with custom monthly rates.",
        icon: "building" as IconName,
        tag: "Layout Setup",
      },
      {
        step: "02",
        title: "Invite staff & residents",
        outcome: "Onboard your team without paper forms.",
        description:
          "Assign wardens to their respective properties with scoped manager permissions; residents receive secure onboarding links to their personal portal.",
        icon: "users" as IconName,
        tag: "Role Scoping",
      },
      {
        step: "03",
        title: "Billing and requests run themselves",
        outcome: "Put rent tracking and operations on autopilot.",
        description:
          "Recurring rent invoices generate on the 1st, residents pay via Razorpay with instant PDF receipts, and maintenance tickets route directly to wardens.",
        icon: "creditCard" as IconName,
        tag: "Automation",
      },
      {
        step: "04",
        title: "See everything in one place",
        outcome: "Gain total peace of mind from any device.",
        description:
          "Owners monitor portfolio revenue and occupancy live; wardens resolve daily tasks calmly without register books or WhatsApp chaos.",
        icon: "layout" as IconName,
        tag: "Full Visibility",
      },
    ],
  },
  gettingStarted: {
    title: "Getting started should be simple.",
    lead: "Early access is personal. A person on our team reads every request.",
    steps: [
      {
        title: "You request early access.",
        body: "Share a few details about your property using the form below.",
      },
      {
        title: "We review your request.",
        body: "Our team reads each request to understand who it's from and what you need.",
      },
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
    afterSubmit:
      "Our team reviews every request and will contact you after reviewing it. We can't promise a demo or an onboarding date yet.",
    notice:
      "We use these details only to review your request and contact you about early access. You can withdraw your consent at any time.",
    success: {
      title: "Thank you — your request has reached us.",
      body: "Our team will contact you after reviewing it. We'll use these details only for that.",
    },
    disabled: {
      title: "Our early-access form isn't connected yet.",
      withContact: "You can still reach us directly:",
      withoutContact:
        "Please check back soon. The form will open once it's ready to receive requests.",
    },
    errors: {
      invalid: "Please fix the following",
      rejected:
        "We couldn't accept this submission. Please reload the page and try again.",
      notConfigured: "Our early-access form isn't connected yet.",
      upstream:
        "We couldn't send your request. Your details are still here — please try again.",
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
      challenge: {
        label: "Your biggest operational challenge",
        placeholder: "",
      },
      consent: `I agree that the ${name} team may use these details to contact me about early access, as described in the`,
      consentLink: "privacy notice",
    },
  },
  pricingTeaser: {
    eyebrow: "Transparent Pricing",
    title: "Simple plans for every property scale.",
    lead: "Choose your tier. Every plan includes dedicated account setup by our team.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "₹1,999",
        cadence: "/ month",
        tagline:
          "2 properties, 120 beds, 10 staff. Rooms, beds, rent ledger, receipts, complaints, and notices.",
        popular: false,
      },
      {
        id: "growth",
        name: "Growth",
        price: "₹4,999",
        cadence: "/ month",
        tagline:
          "6 properties, 400 beds, 40 staff. Everything in Starter, plus leave/visitor management, maintenance/inventory, and owner analytics.",
        popular: true,
      },
      {
        id: "portfolio",
        name: "Portfolio",
        price: "₹14,999",
        cadence: "/ month",
        tagline:
          "25 properties, 2,500 beds, 250 staff. Everything in Growth, plus online rent collection and priority support.",
        popular: false,
      },
    ],
    cta: {
      label: "View full plans",
      href: "/pricing",
    },
  },
  faq: {
    eyebrow: "Clear Answers",
    title: "Frequently Asked Questions",
    lead: `Everything you need to know about ${name}'s live management platform.`,
    items: [
      {
        q: `What operations does ${name} manage?`,
        a: `${name} manages your entire daily property workflow: room and bed occupancy, automated monthly rent invoicing, maintenance and complaint tickets, digital leave out-passes, visitor gate logs, and asset inventory — all unified in one live system.`,
      },
      {
        q: "Can I manage multiple properties from one account?",
        a: "Yes. Owners already manage multiple hostel buildings and PG branches from a single account. You can monitor occupancy, collections, and staff performance across your entire portfolio from one central dashboard.",
      },
      {
        q: "How does online rent payment via Razorpay work?",
        a: "Online rent payment is live via Razorpay. Residents receive direct payment links to clear their monthly dues via UPI, debit/credit cards, or net banking. Transactions are logged immediately with verified timestamps, and downloadable PDF receipts are generated automatically for tenants and parents.",
      },
      {
        q: "How do wardens and residents access the platform?",
        a: `${name} provides dedicated role-scoped access for every user. Wardens manage daily check-ins, complaints, and visitor logs on their property dashboard, while students use a lightweight personal portal to view dues, submit repair requests, apply for leave, and read notices.`,
      },
      {
        q: "How does account onboarding work once I choose a plan?",
        a: "There is no confusing self-serve configuration. Once you select a paid plan, our operations team connects with you within two hours to collect your room layouts, sharing formats, and resident lists. We personally configure your account so you are operational on day one.",
      },
    ],
  },
  finalCta: {
    headline:
      "Run every room, rent rupee, and tenant request with total clarity.",
    cta: {
      label: "See Plans & Pricing",
      href: "/pricing",
    },
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
