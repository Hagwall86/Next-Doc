import Link from "next/link";

export default function Header() {
  return (
    <div>
      <nav className="flex justify-around items-center bg-neutral-700">
        <Link href="/">
          <h1 className="text-3xl font-bold text-black">
            NextDoc
          </h1>
        </Link>
        <Link href="/new-doc" className="text-black font-bold underline">Lägg till dokument</Link>
      </nav>
    </div>
  );
}
