import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ListItem, ListItemPrefix, Spinner } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";


interface ISelectedItemProps {
    tasks: { link: string; task: string; }[];
    link: string;
}
const SideBarItemTask:FC<ISelectedItemProps> = ({tasks, link}) => {
    const pathName = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect( () => {
            setLoading(false)
    }, [pathName])


    return (
        tasks.length && tasks.map(task => (
            <ListItem
                key={task.link}
                onClick={() => {router.push(link + task.link); setLoading(true)}}
                className={`md:text-sm text-xs ${pathName === link + task.link ? ' text-black bg-white': ' text-white'}`}
            >
                <ListItemPrefix className={`transition-transform delay-200 ${
                        pathName === link + task.link ? " rotate-[360deg]" : ""
                    }`}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                {task.task}
                {loading && <Spinner className="ml-2 w-4 h-4 flex items-center" />}
            </ListItem>
        ))
    );
};

export default SideBarItemTask;