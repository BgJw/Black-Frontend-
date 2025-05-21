'use client'

import { IList, getOrderbyId } from '@/app/api/order';
import { useAppSelector } from '@/hooks/store';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderId = () => {
    const params = useParams();
    const [order, setOrder] = useState<IList>();
    const {day, month, year} = useAppSelector( state => state.listSlice );
    const {data} = useSession();

    const fetchOrderById = async () => {
        if (!data?.user?.name) {
            return;
        }
        await getOrderbyId(day.numb, month, year, data.user.name, String(params.orderId))
            .then( (res) => {setOrder(res as IList)});
    }

    useEffect( () => {
        fetchOrderById()

    }, [params]);

    return (
        <div>
            {order?.amountToPay}
            {order?.cardOrCash}
            {order?.customerNumber}
            {order?.dateReceived}
            {order?.hour}
            {order?.paid}
            {order?.receivedBy}
            {order?.whatReceived.map(order => order.name)}
            {order?.weight}
            {order?.whoMadeIt}
            {order?._id}
        </div>
    );
};

export default OrderId;