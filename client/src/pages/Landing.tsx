import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect immediately to crypto dashboard
    setLocation("/");
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#FB03F5] to-[#AA9CFF] rounded-full animate-pulse mx-auto mb-4" />
        <p className="text-white text-lg">Loading Crypto Dashboard...</p>
      </div>
    </div>
  );
}
