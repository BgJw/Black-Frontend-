'use client'
import ListHeader from '@/components/list/header';
import ListTitle from '@/components/list/listTitle';
import withAuth from '@/components/withAuth';
import Orders from '@/components/list/orders';
import { Card } from '@material-tailwind/react';

import s from './list.module.scss';


const List = () => {

    return (
        <div className={s.wrap + " flex-col items-center overflow-x-auto relative w-full"}>
            <ListHeader  />
            <Card className="h-full w-full overflow-x-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <ListTitle />
                    <Orders />
                </table>
            </Card>
        </div>
    );
};

export default withAuth(List);