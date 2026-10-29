// Inline SVG line icons, hand-authored on a 24×24 grid at 1.5px stroke (specs/05 §18).
// Decorative by default; pass `title` only when the icon carries meaning on its own.

const paths = {
  bed: (
    <>
      <path d="M3 18V6" />
      <path d="M3 14h18v4" />
      <path d="M21 14v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="11" r="2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
      <path d="M15.5 5.2a3.25 3.25 0 0 1 0 5.6" />
      <path d="M17.5 14.3c1.8.6 3.1 2.2 3.5 4.7" />
    </>
  ),
  rupee: (
    <>
      <path d="M7 5h10" />
      <path d="M7 9.5h10" />
      <path d="M7 5h3.5a4.5 4.5 0 0 1 0 9H7l7.5 6" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 3v18" />
      <path d="M12 8h4" />
      <path d="M12 12h4" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="M3 9.5h18" />
      <path d="M3 14.5h18" />
      <path d="M9 4.5v15" />
    </>
  ),
  chat: (
    <>
      <path d="M4 18.5V7a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 7v7a2.5 2.5 0 0 1-2.5 2.5H8z" />
      <path d="M8.5 9.5h7" />
      <path d="M8.5 12.5h4.5" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5.5a3 3 0 0 0-5.6-1.4A3 3 0 0 0 4 8.8a3.2 3.2 0 0 0 .7 5.6A3 3 0 0 0 9 18.6a3 3 0 0 0 3 1.9z" />
      <path d="M12 5.5a3 3 0 0 1 5.6-1.4A3 3 0 0 1 20 8.8a3.2 3.2 0 0 1-.7 5.6 3 3 0 0 1-4.3 4.2 3 3 0 0 1-3 1.9" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M9 4v16" />
      <path d="M9 11h12" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
      <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4 4 0 0 1 4.6-.7l.4.2a3 3 0 0 0 1.6.4H21" />
      <path d="M21 5v8.5" />
      <path d="M3 5v8.5" />
      <path d="M3 6h3.5L10 9" />
      <path d="m3 13.5 7 6.5a1.4 1.4 0 0 0 2-2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 5 5 9-10" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5 5.5-6" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4 2.8 19.5h18.4z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />
  ),
  spinner: <path d="M12 3a9 9 0 1 0 9 9" />,
  pause: (
    <>
      <path d="M9 5v14" />
      <path d="M15 5v14" />
    </>
  ),
  play: <path d="M7 4.5v15l12-7.5z" />,
} as const;

export type IconName = keyof typeof paths;

type IconProps = {
  name: IconName;
  size?: number;
  title?: string;
  className?: string;
};

export function Icon({ name, size = 24, title, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      focusable="false"
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
