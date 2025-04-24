'use client'
import { Accordion, AccordionHeader, AccordionBody, List, ListItem, ListItemPrefix, Spinner } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FC, memo, MouseEvent, useCallback, useEffect, useState } from 'react';
import Icons from './Icons';
import SideBarItemTask from "./SideBarItemTask";

interface SidebarItemProps {
    link: string;
    name: string;
    tasks: { link: string; task: string; }[];
    open: boolean;
    handleOpen: (link: string) => void;
}

const SidebarItem: FC<SidebarItemProps> = ({ link, name, tasks, open, handleOpen }) => {
    const [loading, setLoading] = useState(false);
    const pathName = usePathname();
    const router = useRouter();
    const activeLink = pathName === link;
    
    
    const nextPage = useCallback((e: MouseEvent<HTMLButtonElement>, link: string) => {
        e.stopPropagation();
        if (!activeLink) {
            setLoading(true);
            router.push(link);
        } else {
            handleOpen(link);
        }
    }, [activeLink, link, router, handleOpen]);

    useEffect(() => {
        if (activeLink) {
            handleOpen(link);
            setLoading(false);
        }
    }, [activeLink, link, handleOpen]);


    return (
        <Accordion
            open={open}
            icon={
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            }
        >
            <ListItem
                className={`p-0 hover:opacity-75 duration-200 ${activeLink? 'text-black bg-white hover:opacity-1': 'text-white'}`} 
                selected={open}>
                <AccordionHeader
                    onClick={(e) => nextPage(e, link)}
                    className="border-b-0 p-3"
                >
                    <ListItemPrefix>
                        <Icons name={link} />
                    </ListItemPrefix>
                    <div className="flex items-center gap-2 w-20">
                        <span className="mr-1 font-normal sm:text-sm text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                            {name}
                        </span>
                        {loading && <Spinner className="w-4 h-4" />}
                    </div>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                    <SideBarItemTask 
                        tasks={tasks} 
                        link={link}
                        handleOpen={handleOpen}
                    /> 
                </List>
            </AccordionBody>
        </Accordion>
    );
};

export default memo(SidebarItem);
