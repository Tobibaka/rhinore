import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-black shadow-sm fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="background-white rounded-full p-1 hover:shadow-md transition-shadow duration-200 hover:black-back">
          <Image src="/m/rhino.png" alt="Rhinore Logo" width={100} height={100} />
        </Link>
      </div>
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="text-gray-700 hover:text-white font-medium">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="rounded px-4 py-2 bg-gray-600 font-medium text-white hover:text-green-300   ">Log-in</Link>
        <Link href="/register" className="text-white bg-gray-600  px-4 py-2 rounded font-medium hover:text-orange-400">Register</Link>
      </div>
    </nav>
  );
}
