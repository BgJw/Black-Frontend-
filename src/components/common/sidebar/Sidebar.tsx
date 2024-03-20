'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SingleTask from './SingleTask';

const links = [
    { link: '/orders', name: 'Zlecenia', tasks: [{link: '/newOrder', task:'Nowe Zlecenie'}] }, 
    { link: '/list', name: 'Zeszyt', tasks: [{link: '/search', task:'Wyszukaj'}] }, 
    { link: '/schedule', name: 'Grafik', tasks: [{link: '/newMonth', task:'Nowy mięsiąc'}] }];

const Sidebar = React.memo(() => {
    const pathName = usePathname();
    const getLinkStyle  = (link: string) => pathName === link ? 'bg-sky-900 pl-6 hover:bg-sky-900': 'hover:bg-slate-800 pl-4';

    return (
        <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
            {
                links.map(({ link, name, tasks }) => (
                    <React.Fragment key={name}>
                        <Link
                            href={link}
                            className={getLinkStyle(link) + " p-5 duration-100 cursor-pointer"}>
                                {name}
                        </Link>
                        {
                            pathName.includes(link) && 
                                tasks.map(task => (
                                    <SingleTask key={task.task} link={link + task.link} taskName={task.task} />
                                ))
                        }

                    </React.Fragment>
                ))
            }

            <div className="bg-gray-600 h-[1px]"></div>
        </div>
    );
});

export default Sidebar;