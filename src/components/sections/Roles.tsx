import { content } from "@/config/site-content";
import { Icon } from "@/components/ui/Icon";

/**
 * Homepage "Built for every role" Section
 * - Three columns: Owner, Manager/Warden, Student
 * - Each column states strictly what that role sees (real trust signal, data scoped to each role)
 * - Card radius 1.125rem, border-line, soft layered shadows
 * - Tokens-only, rename-safe
 */
export function Roles() {
  const { roles } = content;

  const getRoleIcon = (id: string) => {
    if (id === "owner") return "building";
    if (id === "warden") return "shield";
    return "users";
  };

  const getRoleBadgeClass = (accent: string) => {
    if (accent === "slate-ink") return "tag tag-info";
    if (accent === "amber") return "tag tag-attention";
    return "tag tag-success";
  };

  return (
    <section
      id="roles"
      aria-labelledby="roles-heading"
      className="py-16 md:py-24 bg-canvas-sand/30 border-b border-line"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            {roles.eyebrow}
          </span>

          <h2
            id="roles-heading"
            className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso"
          >
            {roles.title}
          </h2>

          <p className="mt-4 font-body text-lead text-dust leading-relaxed max-w-2xl mx-auto">
            {roles.lead}
          </p>
        </div>

        {/* Three Columns Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {roles.columns.map((role) => (
            <div
              key={role.id}
              className="card flex flex-col justify-between p-6 md:p-8 bg-cream shadow-card transition-all duration-(--dur-ui) ease-standard hover:shadow-card-hover"
            >
              <div>
                {/* Header: Role icon, badge, title */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={[
                      "flex size-12 items-center justify-center rounded-btn border shadow-xs",
                      role.accent === "slate-ink"
                        ? "bg-slate-ink/10 text-slate-ink border-slate-ink/20"
                        : role.accent === "amber"
                          ? "bg-amber/10 text-amber border-amber/20"
                          : "bg-moss/10 text-moss border-moss/20",
                    ].join(" ")}
                  >
                    <Icon name={getRoleIcon(role.id)} size={22} />
                  </div>
                  <span className={getRoleBadgeClass(role.accent)}>
                    {role.badge}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-h3 font-medium text-espresso">
                  {role.title}
                </h3>

                <p className="mt-1 font-body text-body font-medium text-clay-600">
                  {role.tagline}
                </p>

                <p className="mt-3 font-body text-small text-dust leading-relaxed">
                  {role.scopeStatement}
                </p>

                {/* "What this role sees" list */}
                <div className="mt-6 rounded-card border border-line bg-canvas p-4 shadow-xs">
                  <span className="font-body text-caption font-semibold uppercase tracking-wider text-espresso block mb-3">
                    What this role sees:
                  </span>
                  <ul className="space-y-2.5 font-body text-small text-bark">
                    {role.whatTheySee.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-moss font-semibold flex-none mt-0.5">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Scoped Boundary Guarantee (Trust Signal) */}
              <div className="mt-6 pt-4 border-t border-line/70">
                <div className="flex items-start gap-2.5 text-caption text-dust font-medium leading-relaxed">
                  <span className="text-dust flex-none mt-0.5">🔒</span>
                  <span>
                    <strong className="text-espresso font-semibold">
                      Boundary:
                    </strong>{" "}
                    {role.restrictedBoundary}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
