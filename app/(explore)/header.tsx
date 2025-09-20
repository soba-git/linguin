import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full h-24 bg-white border-b border-slate-200 flex items-center px-12 shadow-sm">
      {/* Logo */}
      <div className="relative w-22 h-22">
        <Image
          src="/header-logo.png"
          alt="Linguin Logo"
          fill
          className="object-contain drop-shadow-lg transform transition-transform hover:scale-105"
        />
      </div>
    </header>
  );
};

export default Header;
