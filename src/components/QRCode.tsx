
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
        dark: document.documentElement.classList.contains("dark") ? "#000000" : "#000000",
        light: "#ffffff", // Always white background for better contrast
      },
    }).catch(err => console.error("Error generating QR code:", err));
  }, [data, size]);

  return (
    <div className="flex justify-center bg-white rounded-md p-2">
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};

export default QRCode;
