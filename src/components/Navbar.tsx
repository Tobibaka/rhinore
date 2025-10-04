import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className=" w-full h-20 flex items-center justify-between px-8 bg-black shadow-lg fixed top-0 left-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="background-white rounded-full p-2 hover:shadow-md transition-shadow duration-200 hover:black-back">
          <Image src="/m/rhino.png" alt="Rhinore Logo" width={120} height={120} />
        </Link>
      </div>
      <div className="flex gap-8">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white font-medium text-lg">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex gap-6">
        <Link href="/login" className="rounded-lg px-6 py-3 bg-gray-600 font-medium text-lg text-white hover:bg-gray-700 hover:text-green-300 transition-colors">Log-in</Link>
        <Link href="/register" className="rounded-lg px-6 py-3 bg-gray-600 font-medium text-lg text-white hover:bg-gray-700 hover:text-orange-400 transition-colors">Register</Link>
      </div>
    </nav>
  );
}