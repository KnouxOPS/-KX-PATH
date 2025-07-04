interface JoinCommunityProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    title: "Join Our Community",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    joinNow: "Join Now",
  },
  ar: {
    title: "انضم إلى مجتمعنا",
    description: "انضم إلى مجتمعنا النشط من المتداولين والمستثمرين.",
    joinNow: "انضم الآن",
  },
};

export default function JoinCommunity({ language }: JoinCommunityProps) {
  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <div className="bg-[#2C2C2C]/60 backdrop-blur-xl rounded-2xl p-8 text-center">
      {/* Community Avatar Stack */}
      <div className="relative w-36 h-24 mx-auto mb-8">
        {/* Background avatars */}
        <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-[#1D1D1D]" />
        <div className="absolute top-0 right-12 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border border-[#1D1D1D]" />
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full border border-[#1D1D1D]" />
        <div className="absolute bottom-0 left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full border border-[#1D1D1D]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-red-400 to-pink-400 rounded-full border border-[#1D1D1D]" />

        {/* Main central avatar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full border-2 border-[#1D1D1D]" />

        {/* Floating avatars */}
        <div className="absolute top-2 left-16 w-6 h-6 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full border border-[#1D1D1D]" />
      </div>

      {/* Content */}
      <h3 className="text-white text-lg font-bold mb-4 tracking-wide">
        {t.title}
      </h3>

      <p className="text-white text-sm leading-relaxed mb-8 opacity-80 max-w-52 mx-auto">
        {t.description}
      </p>

      {/* Join Button */}
      <button className="w-full bg-[#2B2B2B] hover:bg-[#3B3B3B] transition-colors rounded-xl py-3 px-6">
        <span className="text-white font-semibold tracking-wide">
          {t.joinNow}
        </span>
      </button>
    </div>
  );
}
