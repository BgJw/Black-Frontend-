import { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
interface Props {
    children: ReactNode
}
const Main = ({children}: Props) => {
    return (
        <div className='grid grid-cols-[minmax(100px,160px),1fr] '>
        <Sidebar />
        {children}
    </div>
    );
};

export default Main;