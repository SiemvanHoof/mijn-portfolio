import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#020108",
          color: "#ffffff",
          fontSize: 40,
          fontWeight: 600,
          borderRadius: 16,
        }}
      >
        S
      </div>
    ),
    size
  );
}