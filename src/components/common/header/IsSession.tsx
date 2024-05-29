'use client'

import { fetchActiveSession } from "@/app/api/session";
import { PowerIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const IsSession = () => {
  const router = useRouter();
  const [department, setDepartment] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signIn');
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const data = await fetchActiveSession();
        setDepartment(data.username);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };

    getSession();
  }, []); 

  return (
    <div className="flex justify-end md:gap-40 gap-20 md:text-sm text-xs ">
      <small className="leading-6">
        Zalogowany: 
        {department}
      </small>
      <button
        onClick={handleLogout}
        className="leading-6 flex items-center gap-1">
        <PowerIcon className="h-5 w-5" />
        <span>
          Log out
        </span>
      </button>
    </div>
  )
};

export default IsSession;
