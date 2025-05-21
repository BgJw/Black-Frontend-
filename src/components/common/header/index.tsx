import Link from "next/link";
import IsSession from "./IsSession";
import Image from "next/image";

import { memo } from "react";
import logo from "../../../../public/image/logo.png";


const Header = memo(() =>  {

	return (
		<header className="w-full h-[70px] text-white z-20 bg-gray-900 fixed top-0 flex">
			<nav className="mx-auto flex items-center justify-between px-4 w-full md:px-10">
					<Link href="/">
						<Image src={logo} width={40} priority quality={50} alt="Logo Black" />
					</Link>
				<IsSession />
			</nav>
		</header>
	)
})

export default Header;
