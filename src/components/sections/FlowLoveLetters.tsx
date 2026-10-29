import { brand } from "@/config/brand";

export function FlowLoveLetters() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        <div
          data-surface="dark"
          className="relative overflow-hidden rounded-[2.5rem] border border-dark-card-border bg-dark-card p-6 text-on-dark shadow-2xl md:p-12 lg:p-16"
        >
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[2.5rem] md:text-[3.5rem] font-normal tracking-tight text-white">
              Love letters to {brand.name}
            </h2>
            <p className="mt-3 text-lead text-on-dark-muted">
              What hostel and PG managers tell us about leaving paper registers
              behind.
            </p>
          </div>

          {/* Top Row: 3 Cream Quote Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Aarav M.",
                role: "45-bed PG Owner, Bengaluru",
                quote:
                  "We recovered ₹35,000 in forgotten rent dues in our very first week of listing records. Having one clear list changes everything.",
              },
              {
                name: "Sunita S.",
                role: "Girls Hostel Warden, Kota",
                quote:
                  "Earlier I had three fat registers for rooms, rent, and KYC. Now I can tell a parent immediately if a double-sharing bed is available.",
              },
              {
                name: "Rajesh P.",
                role: "Student Housing, Pune",
                quote:
                  "Tenants no longer argue about whether they paid rent because every payment has an exact date, amount, and receipt tag.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl bg-canvas p-6 text-ink shadow-md"
              >
                <p className="text-body text-ink leading-relaxed font-serif italic text-[1.125rem]">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-line/60 pt-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-purple-200 text-small font-bold text-purple-900">
                    {card.name[0]}
                  </div>
                  <div>
                    <p className="text-small font-medium text-ink">
                      {card.name}
                    </p>
                    <p className="text-caption text-ink-muted">{card.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: 4 Forest Green Cards with diagonal arrows matching Flow aesthetic */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Recovered ₹42,000 in forgotten dues in month 1",
                author: "S. Rao &middot; Koramangala",
              },
              {
                title:
                  "What used to take 3 hours on the 1st now takes 15 minutes",
                author: "V. Joshi &middot; Hinjewadi",
              },
              {
                title: "Zero disputes on security deposits during move-outs",
                author: "M. Pillai &middot; North Campus",
              },
              {
                title: "Checked vacancy from home during holiday admissions",
                author: "A. Mehta &middot; Greater Noida",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-forest p-5 text-white transition-all hover:bg-forest-light"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-[1.125rem] leading-snug text-white">
                    {item.title}
                  </p>
                  <span
                    className="flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-xs text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
                <p
                  className="mt-4 text-caption text-white/70"
                  dangerouslySetInnerHTML={{ __html: item.author }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
