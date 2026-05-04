export default function Divider({ label = "&" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <span className="block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent shimmer" />
      <span
        className="text-3xl text-gold"
        style={{ fontFamily: "var(--font-great-vibes)" }}
      >
        {label}
      </span>
      <span className="block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent shimmer" />
    </div>
  );
}
