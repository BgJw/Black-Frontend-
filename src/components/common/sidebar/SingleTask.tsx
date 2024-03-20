import Link from "next/link";
import { usePathname } from "next/navigation";

const SingleTask = ({taskName, link}: {taskName: string, link: string}) => {
    const pathName = usePathname();
    const getLinkStyle  = (link: string) => pathName.includes(link) ? 'bg-sky-900 pl-6 hover:bg-sky-900': 'hover:bg-slate-800 pl-4';

    return (
        <Link
            href={link}
            className={getLinkStyle(link) + ' px-8 cursor-pointer whitespace-nowrap w-full p-2'}
            >
            <span className="text-[10px] p-1 font-bold">
                {taskName}
            </span>
        </Link>
    );
};

export default SingleTask;