import Header from '@/components/schedule/header';
import WorkList from '@/components/schedule/workList';
import IconControls from '@/components/schedule/iconControls';



const Schedule = () => {

    return (
        <div className="overflow-x-auto relative w-full">
            <div className='grid justify-items-center gap-2 mb-4'>
                <Header />
                <IconControls />
            </div>
            <WorkList />
        </div>
    );
};

export default Schedule;