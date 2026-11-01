export default function CitySkyline() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[38vh] w-full text-night/80"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1c1644" />
          <stop offset="100%" stopColor="#07060f" />
        </linearGradient>
      </defs>
      <path
        fill="url(#hill)"
        d="M0 260 C 180 220 280 120 420 150 C 540 174 620 90 760 118 C 900 148 980 70 1120 110 C 1240 142 1340 200 1440 170 L 1440 420 L 0 420 Z"
      />
      <path
        fill="#100c28"
        d="M720 210 L780 92 L810 128 L840 70 L890 150 L930 118 L980 210 Z"
        opacity="0.85"
      />
      <g fill="#16103a" opacity="0.95">
        <rect x="560" y="236" width="320" height="184" />
        <rect x="590" y="196" width="52" height="40" />
        <rect x="694" y="168" width="52" height="68" />
        <rect x="798" y="196" width="52" height="40" />
        <polygon points="590,196 616,156 642,196" />
        <polygon points="694,168 720,118 746,168" />
        <polygon points="798,196 824,156 850,196" />
        <rect x="708" y="88" width="24" height="30" />
        <polygon points="708,88 720,58 732,88" />
      </g>
      <g fill="#1a1444">
        <rect x="1080" y="210" width="18" height="210" />
        <polygon points="1080,210 1089,150 1098,210" />
        <rect x="1124" y="210" width="18" height="210" />
        <polygon points="1124,210 1133,150 1142,210" />
      </g>
      <rect x="0" y="372" width="1440" height="48" fill="#0b1c28" opacity="0.45" />
    </svg>
  );
}
