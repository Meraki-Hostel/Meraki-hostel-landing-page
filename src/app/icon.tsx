import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Text monogram until a logo exists. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#172a46",
          color: "#faf9f6",
          fontSize: 22,
          borderRadius: 8,
        }}
      >
        {brand.name.charAt(0)}
      </div>
    ),
    size,
  );
}
