export function YoutubeSummary3D({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Document Base */}
      <g className="drop-shadow-xl">
        <rect
          x="40"
          y="60"
          width="120"
          height="100"
          rx="12"
          fill="white"
          className="fill-white"
        />
        {/* Text Lines */}
        <rect x="60" y="85" width="80" height="8" rx="4" fill="#E5E7EB" />
        <rect x="60" y="105" width="80" height="8" rx="4" fill="#E5E7EB" />
        <rect x="60" y="125" width="60" height="8" rx="4" fill="#E5E7EB" />
      </g>

      {/* Floating Play Button */}
      <g className="animate-bounce-slow drop-shadow-2xl">
        <rect
          x="65"
          y="40"
          width="70"
          height="50"
          rx="12"
          fill="#FF385C" // Airbnb Red
        />
        <path d="M95 55L110 65L95 75V55Z" fill="white" />
      </g>
    </svg>
  );
}
