"use client";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
    >
      <rect x="8" y="16" width="48" height="40" rx="6" fill="#7C3AED" />
      <rect x="12" y="20" width="40" height="32" rx="4" fill="#0F172A" />
      <rect x="16" y="24" width="10" height="8" rx="2" fill="#7C3AED" opacity="0.8" />
      <rect x="28" y="24" width="10" height="8" rx="2" fill="#10B981" opacity="0.8" />
      <rect x="40" y="24" width="10" height="8" rx="2" fill="#7C3AED" opacity="0.8" />
      <rect x="16" y="34" width="10" height="8" rx="2" fill="#10B981" opacity="0.8" />
      <rect x="28" y="34" width="10" height="8" rx="2" fill="#7C3AED" opacity="0.8" />
      <rect x="40" y="34" width="10" height="8" rx="2" fill="#10B981" opacity="0.8" />
      <rect x="16" y="44" width="10" height="4" rx="2" fill="#7C3AED" opacity="0.8" />
      <rect x="28" y="44" width="10" height="4" rx="2" fill="#10B981" opacity="0.8" />
      <rect x="40" y="44" width="10" height="4" rx="2" fill="#7C3AED" opacity="0.8" />
      <path
        d="M32 2C26.477 2 22 6.477 22 12c0 7 10 16 10 16s10-9 10-16c0-5.523-4.477-10-10-10z"
        fill="#10B981"
      />
      <circle cx="32" cy="12" r="4" fill="#0F172A" />
    </svg>
  );
}
