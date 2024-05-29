'use client'

import IsPaid from '@/components/list/isPaid/IsPaid';
import ListHeader from '@/components/list/header/ListHeader';
import ListTitle from '@/components/list/listTitle/ListTitle';

import { useEffect, useState } from 'react';
import { SERVER_PORT } from '../api/handleApiRequest';

import s from './list.module.scss';
import withAuth from '@/components/withAuth';


enum payMetod {
    card = 'K',
    cash = 'G',
    toBePaid = 'Do zapłaty'
}

interface IList {
    id: string,
    dateReceived: number,
    whatReceived: string[],
    customerNumber: number,
    receivedBy: string,
    amountToPay: number,
    paid: boolean,
    cardOrCash: payMetod,
    weight: string,
    whoMadeIt: string,
    hour: number
}

type NullableIlist = IList | null;
const List = () => {
    const [orders, setOrders] = useState<IList[]>([]);
    // const personel = useAppSelector( state => state.scheduleSlice.personel );

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SERVER_PORT}/orders`);

                if (response.ok) {
                    const data: IList[] = await response.json();
                    
                    setOrders(data);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    const itemsCount = 15;

    const paddedList: NullableIlist[] = [...orders];
    while (paddedList.length < itemsCount) {
        paddedList.push(null);
    }


        
    return (
        <div className={s.wrap + " flex-col items-center overflow-x-auto relative w-full"}>
            <ListHeader  />
            <ListTitle />
                {
                    paddedList.map((order, i) => (
                        <ul className='flex' key={i}>
                        {
                            order ?
                            (<>
                                <li className='cell'>{i + 1}</li>
                                <li>{order.dateReceived}</li>
                                <li>{order.whatReceived}</li>
                                <li>{order.customerNumber}</li>
                                <li>{order.receivedBy}</li>
                                <li>{order.amountToPay}</li>
                                <li> <IsPaid isPaid={order.paid} /></li>
                                <li>{order.cardOrCash}</li>
                                <li>{order.weight}</li>
                                <li>{order.whoMadeIt}</li>
                                <li>{order.hour + ':00'}</li>
                                </>)
                                :
                                (<>
                                <li>{i + 1}</li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </>)
                            }
                            </ul>
                            ))
                }
        </div>
    );
};

export default withAuth(List);