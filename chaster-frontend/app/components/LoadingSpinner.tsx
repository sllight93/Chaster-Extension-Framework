"use client";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "var(--radius-large)",
        backgroundColor: "var(--color-bg)",
        maxWidth: "800px",
        margin: "1rem auto",
        textAlign: "center",
      }}
    >
      <div style={{ color: "var(--color-accent)" }} className="flex flex-col items-center justify-center space-y-4 py-8">
        <svg
          className="animate-spin h-12 w-12 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    </div>
  );
}