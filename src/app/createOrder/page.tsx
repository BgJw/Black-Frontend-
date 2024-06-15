"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Header } from "@/components/createOrder/header";
import MyInput from "@/components/myInput";
import MySelect from "@/components/mySelect";
import Notification from "@/components/notification";
import { Items } from "@/components/createOrder/items";
import SelectForm from "@/components/createOrder/selectForm";
import { SubmitForm } from "@/components/createOrder/submitForm";
import { TotalPrice } from "@/components/createOrder/totalPrice";
import { getDates } from "@/helpers/isWeekend";
import { ISelectedItem, PaidMethod, fetchClientNumber } from "../api/order";
import withAuth from "@/components/withAuth";


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

const listDates = getDates(new Date(), 30);



const Orders: FC = () => {
  
  const [customerNumber, setCustomerNumber] = useState<string>('');
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

        setCustomerNumber(customerNumber);
  }

  useEffect( () => {
    fetchClientNumber()
     .then((numb) => {
        setCustomerNumber(String(
          numb < 10
            ? "00" + numb
            : numb < 100
            ? "0" + numb
            : numb
        ));
      })
      
      }, [customerNumber])
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
              options={['Gotówka', 'Karta', 'Do zapłaty']}
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

export default withAuth(Orders);