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
import { Button } from "@material-tailwind/react";
import { StepperWithDots } from "@/components/steper";


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
  const [nextStep, setNextStep] = useState(0);
  const [error, setError] = useState(false);

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
    _id: ''
  };

  const setCardOrCashProps = useCallback((value: string) =>{ setCardOrCash(value as PaidMethod)}, [setCardOrCash, cardOrCash]);

  const resetAll = async () => {
    setNextStep(0);
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

    try {
      const numb = await fetchClientNumber();
      setCustomerNumber(String(
        numb < 10
          ? "00" + numb
          : numb < 100
            ? "0" + numb
            : numb
      ));
    } catch (error) {
      console.error("Error fetching client number:", error);
    }
  }

 const handleNextStep = () => {
    if (nextStep === 0 && selectedItems.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setNextStep(nextStep + 1);
  };

  const handlePrevStep = () => {
    setNextStep(nextStep - 1);
  };


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
      
      }, [selectedItems.length])

      useEffect( () => {
        if (selectedItems.length < 1) {
          setError(true);
        } else {
          setError(false);
        }


      }, [selectedItems.length]);


      
  return (
    <div className="w-full relative mb-2">
      <Header />
      <StepperWithDots step={nextStep} error={error}  />
      <div className="w-full p-3 flex flex-wrap justify-center gap-2">
        {
          nextStep === 0 && (
            <div className="flex flex-wrap items-center justify-center md:w-[80%]">
              <div className="flex flex-wrap w-full gap-2 p-2">
                  <SelectForm 
                      selectedItems={selectedItems} 
                      setSelectedItems={setSelectedItems} 
                  />
                  <Items 
                    selectedItems={selectedItems} 
                    setSelectedItems={setSelectedItems} 
                  />
              </div>
              <Button className={`${error? 'bg-red-600': 'bg-green-600'} min-w-36 duration-100 delay-100 transition-all`}
                    onClick={ handleNextStep }>
                      {error ? 
                        'Wybierz co najmniej jedną pozycję'
                        : 
                        'Dalej'
                      }
              </Button>
            </div>
          )
        }
        {
          nextStep === 1 && (
      <div className="flex flex-wrap items-center justify-center md:w-[80%]">
        <div className="flex justify-center gap-2 w-full">
          <MyInput
              name={"Nr klienta"}
              setValue={setCustomerNumber}
              value={customerNumber}
              disabled={true}
          />
          <MyInput
              name={"Data przyjęcia"}
              setValue={setDateReceived}
              value={dateReceived}
          />
        </div>
        <div className="flex justify-center gap-2 w-full">
            <MyInput
                name={"Kto przyjąl"}
                setValue={setReceivedBy}
                value={receivedBy}
              />
            <MySelect
              name={"Na kiedy ?"}
              setValue={setForWhen}
              options={listDates}
            />
        </div>
        <div className="flex justify-center gap-2 w-full">
        <MySelect
            name={"Metoda oplaty"}
            setValue={setCardOrCashProps}
            options={['Gotówka', 'Karta', 'Do zapłaty']}
          />
          <MySelect
            name={"Godzina odbioru"}
            setValue={setHour}
            options={hours}
          />
        </div>
        <div className="grid justify-center w-full">
            <TotalPrice items={selectedItems} setAmountToPay={setAmountToPay} />
            <div className="flex gap-2">
              <Button
                  className=" bg-teal-500" 
                  onClick={ handlePrevStep }>
                  Wstecz
              </Button>
              <SubmitForm newOrder={newOrder} resetAll={resetAll}/>
            </div>
        </div>
      </div>

          )
        }
      </div>
      <Notification />
    </div>
  )
};

export default Orders;