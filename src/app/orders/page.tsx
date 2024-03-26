"use client";
import { useAppSelector } from "@/components/hooks/store";
import MyInput from "@/components/myInput/MyInput";
import MySelect from "@/components/mySelect/MySelect";
import { Header } from "@/components/orders/header/Header";
import SelectedItem from "@/components/orders/selectedItem/SelectedItem";
import { TotalPrice } from "@/components/orders/totalPrice/TotalPrice";
import { getDates } from "@/helpers/isWeekend";
import { ChangeEventHandler, useState } from "react";

interface IList {
  dateReceived: string;
  whatReceived: ISelectedItem[];
  customerNumber: string;
  receivedBy: string;
  amountToPay: string;
  paid: boolean;
  cardOrCash: PaidMethod;
  weight: string;
  whoMadeIt: string;
  hour: string;
  forWhen: string;
}

export enum PaidMethod {
  Cash = "Gotówka",
  Card = "Karta",
  DoPay = 'Do zapłaty'
}

const listThings = [
  {
    "id": 1,
    "price": "19.89 zł",
    "name": "pranie + magieł"
  },
  {
    "id": 2,
    "price": "39,89 zł",
    "name": "Marynarka"
  },
  {
    "id": 3,
    "price": "35,19 zł",
    "name": "Spodnie"
  },
  {
    "id": 4,
    "price": "75,08 zł",
    "name": "Garnitur dwuczęściowy"
  },
  {
    "id": 5,
    "price": "35,19 zł",
    "name": "Spódnica"
  },
  {
    "id": 6,
    "price": "41,05 zł",
    "name": "Sukienka"
  },
  {
    "id": 7,
    "price": "68,19 zł",
    "name": "Sukienka wieczorowa"
  },
  {
    "id": 8,
    "price": "51,69 zł",
    "name": "Sukienka komunijna"
  },
  {
    "id": 9,
    "price": "21,09 zł",
    "name": "Kamizelka"
  },
  {
    "id": 10,
    "price": "17,59 zł",
    "name": "Koszula"
  },
  {
    "id": 11,
    "price": "16,39 zł",
    "name": "T-shirt"
  },
  {
    "id": 12,
    "price": "12,89 zł",
    "name": "Koszula - tylko prasowanie"
  },
  {
    "id": 13,
    "price": "23,49 zł",
    "name": "Bluzka"
  },
  {
    "id": 14,
    "price": "22,29 zł",
    "name": "Krawat"
  },
  {
    "id": 15,
    "price": "51,69 zł",
    "name": "Kurtka/płaszcz cienki"
  },
  {
    "id": 16,
    "price": "65,79 zł",
    "name": "Kurtka ocieplana"
  },
  {
    "id": 17,
    "price": "70,49 zł",
    "name": "Kurtka puchowa"
  },
  {
    "id": 18,
    "price": "70,49 zł",
    "name": "Płaszcz ocieplany"
  },
  {
    "id": 19,
    "price": "78,79 zł",
    "name": "Płaszcz puchowy"
  },
  {
    "id": 20,
    "price": "62,29 zł",
    "name": "Płaszcz flauszowy"
  },
  {
    "id": 21,
    "price": "46,99 zł",
    "name": "Kamizelka puchowa"
  },
  {
    "id": 22,
    "price": "82,29 zł",
    "name": "Kurtka narciarska"
  },
  {
    "id": 23,
    "price": "52,89 zł",
    "name": "Spodnie narciarskie"
  },
  {
    "id": 24,
    "price": "28,19 zł",
    "name": "Sweter"
  },
  {
    "id": 25,
    "price": "42,29 zł",
    "name": "Sweter wełniany"
  },
  {
    "id": 26,
    "price": "28,19 zł",
    "name": "Bluza"
  }
]


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

const paymendMethode = [PaidMethod.Card, PaidMethod.Cash, PaidMethod.DoPay];

export interface ISelectedItem {
  id: number;
	price: string;
  name: string;
	numb: string;
}
const Orders = () => {
  const clientNumber = useAppSelector(
    (state) => state.ordersSlice.customerNumber
  );
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
  const [forWhen, setForWhen] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [cardOrCash, setCardOrCash] = useState<PaidMethod>(PaidMethod.DoPay);
  const [hour, setHour] = useState("");
  const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);

  const listName = listThings.map((item) => item.name);



  const listDates = getDates(new Date(), 30);

  const sendDate = () => {
    const newOrder: IList = {
      dateReceived,
      whatReceived: selectedItems,
      customerNumber,
      hour,
      receivedBy,
      amountToPay,
      paid: cardOrCash === PaidMethod.DoPay ? false : true,
      cardOrCash,
      weight: '',
      whoMadeIt: "",
      forWhen,
    };

    
  };
  const increaseItemCount = (id: number, quantity: string) => {
    const index = selectedItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newItems = [...selectedItems];
      newItems[index].numb = quantity;
      setSelectedItems(newItems);
    }
  } 

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (e.target.value !== "Co przyjęte") {

      if (!selectedItems.find( item => item.name === e.target.value)) {
        setSelectedItems([...selectedItems, {
          price: listThings.filter((item) => item.name === String(e.target.value))[0].price,
          name: listThings.filter((item) => item.name === String(e.target.value))[0].name,
          id: listThings.filter((item) => item.name === String(e.target.value))[0].id,
          numb: '1',
        }]);
      }

    }
  };
  
  return (
    <div className="w-full mb-8 mt-8">
      <Header />
      <div className="w-[80%] p-2 m-auto flex flex-col">
        <div className="grid gap-4 mb-2 md:grid-cols-3">
          <MySelect
            name={"Co przyjęte"}
            onChange={(e) => handleSelectChange(e)}
            options={listName}
          />
          <MyInput
            name={"Data przyjęcia"}
            onChange={(e) => setDateReceived(e.target.value)}
            value={dateReceived}
          />
          <MyInput
            name={"Nr klienta"}
            onChange={(e) => setCustomerNumber(e.target.value)}
            value={customerNumber}
          />
        </div>
        <div className="grid gap-4 mb-2 lg:grid-cols-3 grid-cols-1">
          <div
            className="grid items-start gap-2"
            style={{ gridTemplateRows: "repeat(auto-fill, 30px)" }}>

            {selectedItems.map((item, i) => (
              <SelectedItem item={item} key={item.id} increaseItemCount={increaseItemCount} />
            ))}

          </div>
          <div className="grid md:grid-cols-2 gap-4 col-span-2">
            <MyInput
              name={"Kto przyjąl"}
              onChange={(e) => setReceivedBy(e.target.value)}
              value={receivedBy.toUpperCase()}
            />
            <MySelect
              name={"Metoda oplaty"}
              onChange={(e) => setCardOrCash(e.target.value as PaidMethod)}
              options={paymendMethode}
            />
            <MySelect
              name={"Godzina odbioru"}
              onChange={(e) => setHour(e.target.value)}
              options={hours}
            />
            <MySelect
              name={"Na kiedy ?"}
              onChange={(e) => setForWhen(e.target.value)}
              options={listDates}
            />
          </div>
        </div>
        <TotalPrice items={selectedItems} setAmountToPay={setAmountToPay} />
      </div>
    </div>
  );
};

export default Orders;
