import Image from "next/image";
import Logo from "./../assets/images/logo.png";
import Link from "next/link";

export default function LogoLink() {
  return (
    <Link
      href="/"
      className="hover:bg-muted-foreground/20 mr-3 p-1 rounded-2xl duration-300 hover:translate-y-[-2px]"
    >
      <Image src={Logo} alt="logo" width={40} height={40} className="" />
    </Link>
  );
}
