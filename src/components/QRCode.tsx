
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

    const isDarkMode = document.documentElement.classList.contains("dark");
    
    QRCodeLib.toCanvas(canvasRef.current, data, {
      width: size,
      margin: 1,
      color: {
        dark: isDarkMode ? "#ffffff" : "#000000",
        light: "#ffffff", // Changed from "transparent" to "#ffffff"
      },
    }).catch(err => console.error("Error generating QR code:", err));
  }, [data, size]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};

export default QRCode;
