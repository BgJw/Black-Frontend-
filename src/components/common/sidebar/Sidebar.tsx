'use client'

import { IconButton, List, Drawer, Card } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { memo, useEffect, useMemo, useState } from 'react';
import SidebarItem from './SideBarItem';

const links = [
    { link: '/orders', name: 'Zlecenia', tasks: [{link: '/newOrder', task:'Nowe Zlecenie'}] }, 
    { link: '/list', name: 'Zeszyt', tasks: [{link: '/search', task:'Wyszukaj'}] }, 
    { link: '/schedule', name: 'Grafik', tasks: [{link: '/newMonth', task:'Nowy miesiąc'}] }];

const Sidebar = memo(() => {
    const [open, setOpen] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [offsetWindow, setOffSetWindow] = useState<boolean>();

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
     
useEffect( () => {
    setOffSetWindow(window.innerWidth <= 768);
    if(offsetWindow) setIsDrawerOpen(false);

}, [offsetWindow]) 

      return (
        <>
          <IconButton variant="text" size="lg" onClick={ openDrawer}>
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <Drawer 
            open={isDrawerOpen} onClose={ () => offsetWindow && closeDrawer() } 
            className='bg-gray-900 text-white z-20 w-[200px] top-30'>
            <Card
              color="transparent"
              shadow={true}
              className="h-[calc(100vh-2rem)] w-full"
            >
              <List>
                {memoizedSidebarItems}
              </List>
            </Card>
          </Drawer>
        </>
      );
});

export default Sidebar;