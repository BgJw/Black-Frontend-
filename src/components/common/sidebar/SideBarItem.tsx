'use client'
import { Accordion, AccordionHeader, AccordionBody, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Icons from './Icons';

interface SidebarItemProps {
    link: string;
    name: string;
    tasks: { link: string; task: string; }[];
    open: boolean;
    handleOpen: (link: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ link, name, tasks, open, handleOpen }) => {
    const pathName = usePathname();
    const router = useRouter();

    const memoizedTasks = useMemo(() => (
        tasks.map(task => (
            <ListItem
                key={task.link}
                onClick={() => router.push(link + task.link)}
                className='text-white md:text-sm text-xs'
            >
                <ListItemPrefix>
                    {pathName.includes(link + task.link) && (
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    )}
                </ListItemPrefix>
                {task.task}
            </ListItem>
        ))
    ), [tasks, link, pathName, router]);

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
            <ListItem className="p-0" selected={open}>
                <AccordionHeader
                    onClick={() => { router.push(link); handleOpen(link); }}
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
                    {memoizedTasks}
                </List>
            </AccordionBody>
        </Accordion>
    );
};

export default SidebarItem;
