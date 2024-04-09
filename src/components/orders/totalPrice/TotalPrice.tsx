import { ISelectedItem } from "@/app/orders/page";
import { memo, useEffect, useMemo, useState } from "react";

interface ITotalPrice {
    items: ISelectedItem[];
    setAmountToPay: ( amountToPay: string) => void
}

export const TotalPrice = memo(({items, setAmountToPay}: ITotalPrice) => {
  const [discount, setDiscount] = useState(false);

    const totalPrice = useMemo(() => {

        let total = 0;

        items.forEach((item) =>{
            total += parseFloat(item.price) * +item.numb;
        })

        return String(total);
    }, [items]);

    const discountPrice = Number(discount ? +totalPrice * 0.85: totalPrice).toFixed(2); 

    useEffect( () => setAmountToPay(discountPrice), [discountPrice]);
    
    
  return (
        <div className="m-auto text-center flex justify-center items-start gap-2 relative">
            <div className="w-full p-4 relative">

              <h4>Do zapłaty:</h4>
              <span className="text-lg font-bold">
              {
                discountPrice
              }
              </span>
              <div className="absolute bottom-0 -right-24 p-4 ">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  className="w-3 h-3 mb-2 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  checked={discount}
                  onChange={ () => setDiscount( prev => !prev) }
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-1 text-sm text-center font-medium text-gray-400 cursor-pointer"
                >
                  Discount
                </label>
              </div>
            </div>
        </div>
  )
});
