
import React, { useEffect, useRef } from "react";
import QRCodeLib from "qrcode";

interface QRCodeProps {
  data: string;
  size?: number;
}

const QRCode: React.FC<QRCodeProps> = ({ data, size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    QRCodeLib.toCanvas(canvasRef.current, data, {
      width: size,
      margin: 1,
      color: {
        dark: document.documentElement.classList.contains("dark") ? "#ffffff" : "#000000",
        light: "transparent",
      },
    }).catch(err => console.error("Error generating QR code:", err));
  }, [data, size, document.documentElement.classList.contains("dark")]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};

export default QRCode;
