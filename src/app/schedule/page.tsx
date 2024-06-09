'use client'

import Header from '@/components/schedule/header';
import WorkList from '@/components/schedule/workList';
import IconControls from '@/components/schedule/iconControls';
import Notification from '@/components/notification';
import withAuth from '@/components/withAuth';



const Schedule = () => {

    return (
        <div className="grid place-items-center grid-rows-[70px,50px,minmax(100px,1fr)] flex-col items-start overflow-x-auto relative w-full gap-y-4 mx-auto">
            <Header />
            <IconControls />
            <WorkList />
            <Notification />
        </div>
    );
};

export default withAuth(Schedule);