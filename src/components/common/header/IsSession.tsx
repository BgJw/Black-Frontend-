'use client'

import { PowerIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const IsSession = () => {
	const session = useSession();
	
	return (
		<div className="flex justify-end md:gap-40 gap-20 md:text-sm text-xs ">
		<small className="leading-6">
			Zalogowany: {session.data?.user?.name}
		</small>
			<Link
				href="#"
				onClick={() => session.data && signOut({ callbackUrl: '/' })}
				className="leading-6 flex items-center gap-1">
			<PowerIcon className="h-5 w-5" />
			<span>
				Log out
			</span>
			</Link>

	</div>
	)
};


export default IsSession;