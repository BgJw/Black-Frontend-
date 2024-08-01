'use client'

import { StepperWithDots } from "@/components/steper";
import OrderSummary from "../orderSummary";
import { getDates } from "@/helpers/isWeekend";
import { PaidMethod, ISelectedItem, fetchClientNumber } from "@/app/api/order";
import { useState, useCallback, useEffect } from "react";
import MyInput from "@/components/myInput";
import MySelect from "@/components/mySelect";
import { Button } from "flowbite-react";
import { Items } from "../items";
import SelectForm from "../selectForm";

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
  
  
const MainContent = () => {
  const [customerNumber, setCustomerNumber] = useState<string>('');
  const [dateReceived, setDateReceived] = useState(
    `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
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

  const resetAll = useCallback(async () => {
    setNextStep(0);
    setHour('');
    setForWhen('');
    setReceivedBy('');
    setAmountToPay('');
    setCardOrCashProps('');
    setSelectedItems([]);
    setDateReceived(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);

    try {
      const numb = await fetchClientNumber();
      setCustomerNumber(String(numb).padStart(3, '0'));
    } catch (error) {
      console.error("Error fetching client number:", error);
    }
  }, [setCardOrCashProps]);

 const handleNextStep = useCallback(() => {
    if (nextStep === 0 && selectedItems.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setNextStep(nextStep + 1);
  }, [nextStep, selectedItems]);

  const handlePrevStep = useCallback(() => {
    setNextStep(nextStep - 1);
  }, [nextStep]);


  useEffect(() => {
    fetchClientNumber()
      .then(numb => setCustomerNumber(String(numb).padStart(3, '0')))
      .catch(error => console.error("Error fetching client number:", error));
  }, [selectedItems.length]);

  useEffect(() => {
    setError(selectedItems.length < 1);
  }, [selectedItems.length]);


    return (
        <div className="w-full p-3 flex flex-wrap justify-center gap-2">
            <StepperWithDots step={nextStep} error={error}  />
            { nextStep === 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 md:w-[80%]">
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
              <Button className={`${error? 'bg-red-600': 'bg-green-600'} min-w-36 duration-100 delay-100 transition-all `}
                    onClick={ handleNextStep }>
                      {error ? 
                        'Wybierz co najmniej jedną pozycję'
                        : 
                        'Dalej'}
              </Button>
            </div>
          )}
        {nextStep === 1 && (
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
        <OrderSummary 
            items={selectedItems} 
            handlePrevStep={handlePrevStep}
            newOrder={newOrder}
            resetAll={resetAll}
            setAmountToPay={setAmountToPay} 
        />
      </div>
          )}
        </div>
    );
};

export default MainContent;