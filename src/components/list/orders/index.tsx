'use client'

import { IList, PaidMethod, getOrderByDay } from "@/app/api/order";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/store";
import { Chip, Spinner, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getMockSingleList } from "@/mocks/mockOrders";



const Orders = () => {
    const [orders, setOrders] = useState<IList[]>([]);
    const {day, month, year} = useAppSelector( state => state.listSlice );
    const [loading, setLoading] = useState(false);
    const {data} = useSession();

    useEffect(() => {
        const getSessionAndFetchMonth = async () => {
            setLoading(true);
            try {
                const username = data?.user?.name;
                if (username) {
                    const res = await getOrderByDay(day.numb, month, year, username);

                    if (Object.keys(res).length === 0) {
                        const mockData = getMockSingleList(day.numb, month, year);
                        setOrders(mockData);    
                    } else {
                        setOrders(res);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        }
        getSessionAndFetchMonth();
    }, [day.numb, month, year, data]);

    return (
            <tbody>
                {
                    loading && (
                    <tr>
                        <td>
                            <Spinner />
                        </td>
                    </tr>)
                }
                {orders && orders.length > 0 && orders.map((order, i) => {
                    const {dateReceived, whatReceived, customerNumber, receivedBy, amountToPay, cardOrCash, hour, whoMadeIt} = order;
                    return (
                        <tr key={i} className="bg-white even:bg-gray-100">
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {i+1}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {dateReceived}
                            </Typography>
                        </td>
                        <td className="p-4">
                            {
                                whatReceived.map((item, i) => (
                                    <Typography variant="small" color="blue-gray" className="font-light" key={i}>
                                        {item.name === 'pranie + magieł' ? 
                                        item.name  +' '+ item.numb+'kg' :
                                        item.name  +' x '+ item.numb
                                        }
                                    </Typography>
                                ))
                            }
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {customerNumber}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {receivedBy}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {amountToPay}
                            </Typography>
                        </td>
                        <td className='p-4'>
                            <div className="w-max">
                                <Chip
                                size="sm"
                                variant="filled"
                                value={cardOrCash}
                                color={
                                    cardOrCash === PaidMethod.Card
                                      ? "green" 
                                      : cardOrCash === PaidMethod.Cash
                                      ? "blue"   
                                      : "cyan"   
                                  }
                                  
                                />
                            </div>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {whoMadeIt}
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {hour}
                            </Typography>
                        </td>
                        <td className="p-4">
                        <Link href={`/list/edit/${order._id}`} passHref>
                            <Typography as="span" variant="small" color="blue-gray" className="font-medium">
                            Edit
                            </Typography>
                        </Link>

                        </td>
                    </tr>
                    )
                })}
            </tbody>
    );
};

export default Orders;