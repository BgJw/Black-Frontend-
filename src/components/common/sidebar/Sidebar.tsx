'use client'

import { IconButton, List, Drawer } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { memo, useEffect, useMemo, useState } from 'react';
import SidebarItem from './SideBarItem';
import { usePathname } from "next/navigation";

const links = [
    { link: '/orders', name: 'Zlecenia', tasks: [{link: '/newOrder', task:'Nowe Zlecenie'}] }, 
    { link: '/list', name: 'Zeszyt', tasks: [{link: '/search', task:'Wyszukaj'}] }, 
    { link: '/schedule', name: 'Grafik', tasks: [{link: '/newMonth', task:'Nowy miesiąc'}] }
];

const Sidebar = memo(() => {
    const [open, setOpen] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [offsetWindow, setOffSetWindow] = useState<boolean>(false);
    const pathName = usePathname();

    const isSignInPage = pathName === '/signIn';

    const handleOpen = (link: string) => {
        setOpen(open === link ? '' : link);
    };
     
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const memoizedSidebarItems = useMemo(() => (
        links.map(({ link, name, tasks }, index) => (
            <SidebarItem
                key={index}
                link={link}
                name={name}
                tasks={tasks}
                open={open === link}
                handleOpen={handleOpen}
            />
        ))
    ), [links, open]);

    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.innerWidth <= 768;
            setOffSetWindow(isSmallScreen);
            if (isSmallScreen) {
                setIsDrawerOpen(false);
            } else {
                setIsDrawerOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        !isSignInPage && (
            <div className="relative w-full h-full z-30 bg-opacity-60">
                <IconButton variant="text" size="lg" onClick={isDrawerOpen ? closeDrawer : openDrawer}>
                    {isDrawerOpen ? (
                        <XMarkIcon className="h-8 w-8 stroke-2" />
                    ) : (
                        <Bars3Icon className="h-8 w-8 stroke-2" />
                    )}
                </IconButton>
                
                <Drawer 
                    open={isDrawerOpen} 
                    onClose={() => offsetWindow && closeDrawer()} 
                    className='bg-gray-900 text-white z-20 md:w-[200px] w-[180px] top-16'>
                    <List>
                        {memoizedSidebarItems}
                    </List>
                </Drawer>
            </div>
        )
    );
});

export default Sidebar;
