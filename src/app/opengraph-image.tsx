import { ImageResponse } from "next/og";

export const alt = "Siem van Hoof — Digital designer & developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#020108",
          color: "#f5f5f5",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#8a8a90" }}>
          <span>Siem van Hoof</span>
          <span>siemvnhoof.nl</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 120,
            fontWeight: 600,
            letterSpacing: -5,
            lineHeight: 1,
          }}
        >
          <span>Digital designer</span>
          <span>& developer.</span>
        </div>
      </div>
    ),
    size
  );
}