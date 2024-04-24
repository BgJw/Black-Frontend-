'use client'

import { usePathname } from 'next/navigation';
import { IconButton, List, ListItem, Accordion, AccordionHeader, AccordionBody, Drawer, Card, Typography, ListItemPrefix } from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import Icons from './Icons';

const links = [
    { link: '/orders', name: 'Zlecenia', tasks: [{link: '/newOrder', task:'Nowe Zlecenie'}] }, 
    { link: '/list', name: 'Zeszyt', tasks: [{link: '/search', task:'Wyszukaj'}] }, 
    { link: '/schedule', name: 'Grafik', tasks: [{link: '/newMonth', task:'Nowy miesiąc'}] }];

const Sidebar = memo(() => {
    const [open, setOpen] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [offsetWindow, setOffSetWindow] = useState<boolean>();
    const pathName = usePathname();
    const router = useRouter();

    const handleOpen = (link: string) => {
        setOpen(open === link ? '' : link);
      };
     
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
     
useEffect( () => {
    setOffSetWindow(window.innerWidth  <= 768);
    if(offsetWindow) setIsDrawerOpen(false)

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
            className='bg-gray-900 text-white z-20 pt-[3.2rem] w-[200px]'>
            <Card
              color="transparent"
              shadow={true}
              className="h-[calc(100vh-2rem)] w-full p-4"
            >
              <List>
                {
                    links.map(({link, name, tasks}, index) => (
                        <Accordion
                        key={index}
                        open={open === link}
                        icon={
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === link ? "rotate-180" : ""
                            }`}
                          />
                        }
                      >
                        <ListItem className="p-0" selected={open === link}>
                          <AccordionHeader
                            onClick={() => {router.push(link); handleOpen(link); } }
                            className="border-b-0 p-3"
                          >
                            <ListItemPrefix>
                              <Icons name={link} />

                            </ListItemPrefix>
                            <Typography color="white" className="mr-1 font-normal sm:text-base text-xs">

                              {name}
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                          <List className="p-0">
                            {  
                            pathName.includes(link) && 
                                tasks.map(task => (
                                    <ListItem key={task.link} onClick={ () => router.push(link + task.link)}    
                                        className='text-white md:text-sm text-xs'>
                                    <ListItemPrefix>
                                        {
                                            pathName.includes(link + task.link) &&
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        }
                                    </ListItemPrefix>
                                    {task.task}
                                    </ListItem>
                                   ))
                           }

                          </List>
                        </AccordionBody>
                      </Accordion>
                    ))
  
                }
  
              </List>
            </Card>
          </Drawer>
        </>
      );
});

export default Sidebar;