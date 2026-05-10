import Image from "next/image";

export default function MuhurthamScene() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/wedding.png"
        alt="Bride and groom at the Muhurtham ceremony"
        fill
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}
