import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = `${brand.name} — ${brand.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Real design-system tokens (espresso/clay/cream) and the real logo mark —
 * no leftover provisional indigo, no stale "Early access" copy. */
export default function OpengraphImage() {
  const logoData = readFileSync(
    join(process.cwd(), "src/assets/logo/icon-512.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f6efe4",
          color: "#3b2622",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} width={64} height={64} alt="" />
          <div style={{ fontSize: 44, fontWeight: 500 }}>{brand.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.1, letterSpacing: -2 }}>
            {brand.tagline}
          </div>
          <div style={{ fontSize: 30, color: "#5a4540" }}>{brand.title}</div>
        </div>
      </div>
    ),
    size,
  );
}
