import { FC } from 'react';
import { Button } from "@material-tailwind/react";
import { TotalPrice } from '../totalPrice';
import { SubmitForm } from '../submitForm';
import { ISelectedItem } from '@/app/api/order';

interface OrderSummaryProps {
  items: ISelectedItem[];
  setAmountToPay: (value: string) => void;
  handlePrevStep: () => void;
  newOrder: any;
  resetAll: () => void;
}

const OrderSummary: FC<OrderSummaryProps> = ({ items, setAmountToPay, handlePrevStep, newOrder, resetAll }) => {
  return (
    <div className="grid justify-center w-full">
      <TotalPrice items={items} setAmountToPay={setAmountToPay} />
      <div className="flex gap-2">
        <Button className=" bg-teal-500" onClick={handlePrevStep}>
          Wstecz
        </Button>
        <SubmitForm newOrder={newOrder} resetAll={resetAll} />
      </div>
    </div>
  );
};

export default OrderSummary;
