
export function ManualAddIcon() {
  return (
    <svg
      aria-hidden="true"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Bag outline */}
      <path d="M5 7h14l-1 13H6L5 7z" />

      {/* Fold/top flap */}
      <path d="M4 7h16" />
      <path d="M7 4h10l1 3H6z" />

      {/* Simple material symbol (3 small dots) */}
      <circle cx="10" cy="14" r="1" />
      <circle cx="12" cy="16" r="1" />
      <circle cx="14" cy="14" r="1" />
    </svg>
  );
}

export function RegisterIcon() {
  return (
    <svg
      aria-hidden="true"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Larger clipboard */}
      <rect x="3.5" y="2.5" width="17" height="19" rx="2.5" />

      {/* Clip */}
      <path d="M8 2.5v4.2h8V2.5" />

      {/* Larger checkmark */}
      <path d="M9 14.5l2.7 2.7 4.8-4.8" />
    </svg>
  );
}


export function LogoutIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Arrow */}
      <path d="M9 12h10" />
      <path d="M14 7l5 5-5 5" />
      {/* Door / frame */}
      <path d="M4 4h7v16H4z" />
    </svg>
  );
}