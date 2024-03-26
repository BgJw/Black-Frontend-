import Header from '@/components/schedule/header/Header';
import WorkList from '@/components/schedule/workList/WorkList';
import IconControls from '@/components/schedule/iconControls/IconControls';
import Notification from '@/components/notification/Notification';



const Schedule = () => {

    return (
        <div className="grid place-items-center grid-rows-[70px,50px,1fr] flex-col items-start overflow-x-auto relative w-full gap-y-10 mx-auto mb-8 mt-8">
            <Header />
            <IconControls />
            <WorkList />
            <Notification />
        </div>
    );
};

export default Schedule;