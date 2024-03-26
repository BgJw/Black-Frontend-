import { ISelectedItem } from "@/app/orders/page";
import MyInput from "@/components/myInput/MyInput"
import { useEffect, useMemo } from "react";

interface ITotalPrice {
    items: ISelectedItem[];
    setAmountToPay: ( amountToPay: string) => void
}
export const TotalPrice = ({items, setAmountToPay}: ITotalPrice) => {


    const totalPrice = useMemo(() => {

        let total = 0;

        items.forEach((item) =>{
            total += parseFloat(item.price) * +item.numb;
        })
        return String(total);
    }, [items]);

    useEffect( () => setAmountToPay(totalPrice), [totalPrice]);

    // const totalPrice = useMemo(() => {
    //     const listPrice = listThings
    //       .filter((item) => selectedItems.find(selectItem => selectItem.id === item.id) )
    //       .map((item) => item.price);
    
    //     return listPrice
    //       .map((item) => parseFloat(item.replace(/[^\d.,-]/g, "").replace(",", ".")))
    //       .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    //       .toFixed(2);
    //   }, [selectedItems]);
    
    
    
    //   useEffect(() => {
    //     if (selectedItems.find(item => item.name === "pranie + magieł")) {
    //       setAmountToPay(String(Number(totalPrice) - 19.89 + 19.89 * +weight));
    //     } else {
    //       setAmountToPay(String(totalPrice));
    //     }
    
    //   }, [weight, selectedItems]);

  return (
    <>
        <div className=" m-auto text-center flex justify-center items-start gap-2 relative">
          <MyInput
            name={"Do zaplaty"}
            onChange={ () => {}}
            value={totalPrice}
          />
          <div className="absolute bottom-0 -right-20">
            <input
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-3 h-3 mb-2 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-1 text-sm text-center font-medium text-gray-400"
            >
              Discount
            </label>
          </div>
        </div>
        <button
        //   onClick={sendDate}
          className="w-1/2 m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Zapisz
        </button>
    </>
  )
}
