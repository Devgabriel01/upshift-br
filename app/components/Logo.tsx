import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center text-xl font-semibold tracking-[-0.5px] hover:opacity-80 transition"
    >
      <span className="text-white">UPSHIFT</span>
      <span className="text-[#FF6A00] ml-1">BR</span>
    </Link>
  );
}