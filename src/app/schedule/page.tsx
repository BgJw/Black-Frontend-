import Header from '@/components/schedule/header';
import WorkList from '@/components/schedule/workList';
import IconControls from '@/components/schedule/iconControls';
import Notification from '@/components/notification';



const Schedule = () => {

    return (
        <div className="overflow-x-auto relative w-full">
            <div className='grid justify-items-center gap-2 mb-4'>
                <Header />
                <IconControls />
            </div>
            <WorkList />
            <Notification />
        </div>
    );
};

export default Schedule;