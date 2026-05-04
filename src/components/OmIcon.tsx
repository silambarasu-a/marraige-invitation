export default function OmIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontSize="72"
        fontFamily="serif"
        fontWeight="500"
      >
        ॐ
      </text>
    </svg>
  );
}
