'use client'

import { useParams } from 'next/navigation';

const OrderId = () => {
    const params = useParams();


    return (
        <div>
            {params.orderId}
        </div>
    );
};

export default OrderId;