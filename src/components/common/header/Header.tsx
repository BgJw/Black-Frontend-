
import Link from "next/link";
import IsSession from "./IsSession";
import Image from "next/image";

import logo from "../../../../public/image/logo.png";


const Header = () =>  {

	return (
		<header className="w-[100%] h-[70px] text-white z-20 bg-gray-900 fixed top-0 ">
			<nav className="mx-auto flex items-center justify-between p-4 px-10">
					<Link href="/">
						<Image src={logo} priority quality={50} alt="Logo Black" />
					</Link>
				<IsSession />
			</nav>
		</header>
	)
}

export default Header;
