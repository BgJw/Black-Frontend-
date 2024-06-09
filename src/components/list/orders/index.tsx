'use client'

import { IList, PaidMethod, getOrderByDay } from "@/app/api/order";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/store";
import { fetchActiveSession } from "@/app/api/session";
import { Chip, Typography } from "@material-tailwind/react";

const Orders = () => {
    const [orders, setOrders] = useState<IList[]>([]);
    const {day, month, year} = useAppSelector( state => state.listSlice );
    
        
useEffect(() => {
        const getSessionAndFetchMonth = async () => {
                const session = await fetchActiveSession();
                if (session && session.username) {
                    const res = await getOrderByDay(day.numb, month, year, session.username);
                    setOrders(res);
                }
        }
        getSessionAndFetchMonth();
    }, [day.numb, month, year]);


    return (
            <tbody>
                {orders.map(({ amountToPay, cardOrCash, customerNumber, dateReceived, hour, receivedBy, whatReceived, whoMadeIt }, i) => {
  
                    return (
                        <tr key={i} className="even:bg-blue-gray-50/50">
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
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {whatReceived.toString()}
                            </Typography>
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
                                    (cardOrCash === PaidMethod.Card) || (cardOrCash === PaidMethod.Cash) 
                                    ? 
                                    "green" 
                                    :  
                                    "cyan"
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
                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                            Edit
                            </Typography>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
    );
};

export default Orders;