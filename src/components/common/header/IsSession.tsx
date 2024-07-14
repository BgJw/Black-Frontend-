'use client';

import { PowerIcon } from "@heroicons/react/24/solid";
import { signOut, useSession,  } from "next-auth/react";

const IsSession = () => {

  const {data} = useSession();
  
  

  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  return (
    <div className="flex items-center justify-end md:gap-40 gap-20 md:text-sm text-xs ">
      <small className="leading-6">
        Zalogowany: 
        {"  " + data?.user?.name}
      </small>
      <button
        onClick={handleLogout}
        className="leading-6 flex items-center gap-1 hover:opacity-75 p-2 rounded duration-200">
            <PowerIcon className="h-5 w-5" />
            <span>
              Log out
            </span>
      </button>
    </div>
  );
};

export default IsSession;
