"use client";

import { useAppSelector } from "@/components/hooks/store";
import MyInput from "@/components/myInput/MyInput";
import MySelect from "@/components/mySelect/MySelect";
import Notification from "@/components/notification/Notification";
import { Header } from "@/components/orders/header/Header";
import { Items } from "@/components/orders/items/Items";
import SelectForm from "@/components/orders/selectForm/SelectForm";
import { SubmitForm } from "@/components/orders/submitForm/SubmitForm";
import { TotalPrice } from "@/components/orders/totalPrice/TotalPrice";
import { getDates } from "@/helpers/isWeekend";
import { FC, useCallback, useState } from "react";
import { ISelectedItem, PaidMethod } from "../api/order";


const hours = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const paymendMethode = ['Gotówka', 'Karta', 'Do zapłaty'];

const listDates = getDates(new Date(), 30);



const Orders: FC = () => {
  const clientNumber = useAppSelector((state) => state.ordersSlice.customerNumber);
  
  const [customerNumber, setCustomerNumber] = useState(
    String(
      clientNumber < 10
        ? "00" + clientNumber
        : clientNumber < 100
        ? "0" + clientNumber
        : clientNumber
    )
  );
  const [dateReceived, setDateReceived] = useState(
    new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear()
  );
  const [hour, setHour] = useState("");
  const [forWhen, setForWhen] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [cardOrCash, setCardOrCash] = useState('' as PaidMethod);
  const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);
    
  const newOrder = {
    dateReceived,
    whatReceived: selectedItems,
    customerNumber,
    receivedBy,
    amountToPay,
    paid: cardOrCash === PaidMethod.DoPay ? false: true,
    cardOrCash,
    weight: '',
    whoMadeIt: '',
    hour,
    forWhen,
  };

  const setCardOrCashProps = useCallback((value: string) =>{ setCardOrCash(value as PaidMethod)}, [setCardOrCash, cardOrCash]);

  const resetAll = () =>{
      setHour('');
      setForWhen('');
      setReceivedBy('');
      setAmountToPay('');
      setCardOrCashProps('');
      setSelectedItems([]);
      setDateReceived(new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear());

        setCustomerNumber(String(
      clientNumber < 10
        ? "00" + clientNumber
        : clientNumber < 100
        ? "0" + clientNumber
        : clientNumber
    ));
  }
  return (
    <div className="w-full mb-8 mt-8 relative">
      <Header />
      <div className="w-[80%] p-2 m-auto flex flex-col ">
        <div className="flex flex-col-reverse md:grid gap-4 mb-2 md:grid-cols-3 justify-items-center">
          <SelectForm 
            selectedItems={selectedItems} 
            setSelectedItems={setSelectedItems} 
          />

          <MyInput
            name={"Data przyjęcia"}
            setValue={setDateReceived}
            value={dateReceived}
          />
          <MyInput
            name={"Nr klienta"}
            setValue={setCustomerNumber}
            value={customerNumber}
            disabled={true}
          />
        </div>
        <div className="grid gap-4 mb-2 lg:grid-cols-3 grid-cols-1">
          <Items 
            selectedItems={selectedItems} 
            setSelectedItems={setSelectedItems} />
          
          <div className="grid md:grid-cols-2 gap-4 col-span-2 items-center">
            <MyInput
              name={"Kto przyjąl"}
              setValue={setReceivedBy}
              value={receivedBy}
            />
            <MySelect
              name={"Metoda oplaty"}
              setValue={setCardOrCashProps}
              options={paymendMethode}
            />
            <MySelect
              name={"Na kiedy ?"}
              setValue={setForWhen}
              options={listDates}
            />
            <MySelect
              name={"Godzina odbioru"}
              setValue={setHour}
              options={hours}
            />
          </div>
        </div>
        <TotalPrice items={selectedItems} setAmountToPay={setAmountToPay} />
        <SubmitForm newOrder={newOrder} resetAll={resetAll}/>
      </div>
      <Notification />
    </div>
  );
};

export default Orders;