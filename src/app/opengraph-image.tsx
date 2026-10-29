import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = `${brand.name} — ${brand.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Token-coloured card with the wordmark and tagline; no photos or external assets. */
export default function OpengraphImage() {
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
          background: "linear-gradient(139deg, #172a46 12%, #1f375c 100%)",
          color: "#faf9f6",
        }}
      >
        <div style={{ fontSize: 44 }}>{brand.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.1, letterSpacing: -2 }}>{brand.tagline}</div>
          <div style={{ fontSize: 30, color: "rgba(250,249,246,0.78)" }}>{`${brand.title} · Early access`}</div>
        </div>
      </div>
    ),
    size,
  );
}
