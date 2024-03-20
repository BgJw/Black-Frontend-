import Header from '@/components/schedule/header/Header';
import WorkList from '@/components/schedule/workList/WorkList';
import IconControls from '@/components/schedule/iconControls/IconControls';
import Notification from '@/components/notification/Notification';

import s from './shedule.module.scss';

const Schedule = () => {

    return (
        <div className={s.wrap + " flex-col items-center overflow-x-auto relative w-full"}>
            <Header />
            <IconControls />
            <WorkList />
            <Notification />
        </div>
    );
};

export default Schedule;