interface VerificationBadgeProps {
  className?: string;
}

export default function VerificationBadge({ className = "" }: VerificationBadgeProps) {
  return (
    <span
      className={["badge-verified", className].join(" ")}
      title="Verified AIVDP/SOWEDA participant"
      aria-label="Verified participant"
    >
      {/* Checkmark icon */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="6" fill="currentColor" opacity="0.15" />
        <path
          d="M3.5 6L5.2 7.7L8.5 4.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified
    </span>
  );
}
