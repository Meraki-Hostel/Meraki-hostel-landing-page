export function FlowSocialProof() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-8 text-on-dark shadow-xl md:px-12 md:py-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Illustrated avatar / playful character peeking */}
            <div className="flex items-center gap-4">
              <div className="relative flex size-14 flex-none items-center justify-center rounded-2xl bg-amber-400 text-ink shadow-md">
                {/* Playful vector character face matching Flow aesthetic */}
                <svg
                  className="size-10 text-stone-900"
                  viewBox="0 0 36 36"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="18" r="14" className="fill-amber-400" />
                  {/* Glasses */}
                  <rect
                    x="7"
                    y="13"
                    width="9"
                    height="7"
                    rx="3"
                    className="stroke-stone-900 fill-white"
                    strokeWidth="2"
                  />
                  <rect
                    x="20"
                    y="13"
                    width="9"
                    height="7"
                    rx="3"
                    className="stroke-stone-900 fill-white"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="16"
                    x2="20"
                    y2="16"
                    className="stroke-stone-900"
                    strokeWidth="2"
                  />
                  {/* Eyes */}
                  <circle
                    cx="11.5"
                    cy="16.5"
                    r="1.5"
                    className="fill-stone-900"
                  />
                  <circle
                    cx="24.5"
                    cy="16.5"
                    r="1.5"
                    className="fill-stone-900"
                  />
                  {/* Smile */}
                  <path
                    d="M13 24C14.5 26 21.5 26 23 24"
                    className="stroke-stone-900"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Orange hair tuft */}
                  <path
                    d="M12 5C14 2 22 2 24 5"
                    className="stroke-orange-600"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <p className="font-display text-h3 font-medium text-white">
                  Designed for India&apos;s 50,000+ hostel &amp; PG operators
                </p>
                <p className="mt-1 text-small text-white/80">
                  Built for the real workflows of student hostels, working
                  professional PGs, and coliving spaces.
                </p>
              </div>
            </div>

            {/* Hub tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-caption font-medium text-white/90">
                Kota Student Hubs
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-caption font-medium text-white/90">
                Bengaluru Tech PGs
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-caption font-medium text-white/90">
                South Delhi Coliving
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-caption font-medium text-white/90">
                Pune Student Stays
              </span>
            </div>
          </div>

          {/* Wispr Flow style continuous infinite ticker */}
          <div className="mt-8 border-t border-white/15 pt-5 overflow-hidden">
            <div className="flex items-center gap-8 text-caption font-medium text-white/70 whitespace-nowrap animate-pulse">
              <span>● KOTA RAJASTHAN (STUDENT DORMITORIES)</span>
              <span>● BENGALURU ELECTRONIC CITY &amp; HSR (WORKING PGs)</span>
              <span>● SOUTH DELHI HAUZ KHAS &amp; LAJPAT NAGAR</span>
              <span>● PUNE HINJEWADI &amp; VIMAN NAGAR</span>
              <span>● GREATER NOIDA KNOWLEDGE PARK</span>
              <span>● HYDERABAD GACHIBOWLI &amp; MADHAPUR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
