'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const IsSession = () => {
	const session = useSession();
	
	return (
		<div className="flex justify-end gap-40">
		<span className="text-sm font-semibold leading-6">
			Zalogowany: {session.data?.user?.name}
		</span>
			<Link
				href="#"
				onClick={() => session.data && signOut({ callbackUrl: '/' })}
				className="text-sm font-semibold leading-6">
				Log out
				<span aria-hidden="true">&rarr;</span>
			</Link>
	</div>
	)
};


export default IsSession;