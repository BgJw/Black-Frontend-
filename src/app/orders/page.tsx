"use client";
import { useAppSelector } from "@/components/hooks/store";
import MyInput from "@/components/myInput/MyInput";
import MySelect from "@/components/mySelect/MySelect";
import { Header } from "@/components/orders/header/Header";
import SelectedItem from "@/components/orders/selectedItem/SelectedItem";
import { getDates } from "@/helpers/isWeekend";
import { SetStateAction, useEffect, useState } from "react";

interface IList {
  dateReceived: string;
  whatReceived: string[];
  customerNumber: string;
  receivedBy: string;
  amountToPay: string;
  paid: boolean;
  cardOrCash: string;
  weight: string;
  whoMadeIt: string;
  hour: string;
  forWhen: string;
}

const listThings = [
  {
    price: "19.89 zł",
    name: "pranie + magieł",
  },
  {
    price: "39,89 zł",
    name: "<Marynarka>",
  },
  { price: "35,19 zł", name: "<Spodnie>" },
  { price: "75,08 zł", name: "<Garnitur dwuczęściowy>" },
  {
    price: "35,19 zł",
    name: "<Spódnica>",
  },
  {
    price: "41,05 zł",
    name: "<Sukienka>",
  },
  {
    price: "68,19 zł",
    name: "<Sukienka wieczorowa>",
  },
  {
    price: "51,69 zł",
    name: "<Sukienka komunijna>",
  },
  {
    price: "21,09 zł",
    name: "<Kamizelka>",
  },
  {
    price: "17,59 zł",
    name: "<Koszula>",
  },
  {
    price: "16,39 zł",
    name: "<T-shirt>",
  },
  {
    price: "12,89 zł",
    name: "<Koszula - tylko prasowanie>",
  },
  {
    price: "23,49 zł",
    name: "<Bluzka>",
  },
  {
    price: "22,29 zł",
    name: "<Krawat>",
  },
  {
    price: "51,69 zł",
    name: "<Kurtka/płaszcz cienki>",
  },
  {
    price: "65,79 zł",
    name: "<Kurtka ocieplana>",
  },
  {
    price: "70,49 zł",
    name: "<Kurtka puchowa>",
  },
  {
    price: "70,49 zł",
    name: "<Płaszcz ocieplany>",
  },
  {
    price: "78,79 zł",
    name: "<Płaszcz puchowy>",
  },
  {
    price: "62,29 zł",
    name: "<Płaszcz flauszowy>",
  },
  {
    price: "46,99 zł",
    name: "<Kamizelka puchowa>",
  },
  {
    price: "82,29 zł",
    name: "<Kurtka narciarska>",
  },
  {
    price: "52,89 zł",
    name: "<Spodnie narciarskie>",
  },
  {
    price: "28,19 zł",
    name: "<Sweter>",
  },
  {
    price: "42,29 zł",
    name: "<Sweter wełniany>",
  },
  {
    price: "28,19 zł",
    name: "<Bluza>",
  },
];

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
const paymendMethode = ["Karta", "Gotówka", "Do zapłaty"];
interface ISelectedItem {
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
  const [cardOrCash, setCardOrCash] = useState("");
  const [weight, setWeight] = useState("");
  const [hour, setHour] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selected, setSelected] = useState<ISelectedItem[]>([]);

  const listName = listThings.map((item) => item.name);

  const listPrice = listThings
    .filter((item) => selectedItems.indexOf(item.name) !== -1)
    .map((item) => item.price);

  const totalPrice = listPrice
    .map((item) => parseFloat(item.replace(/[^\d.,-]/g, "").replace(",", ".")))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(2);

  useEffect(() => {
    if (selectedItems.includes("Pranie + Magieł")) {
      setAmountToPay(String(Number(totalPrice) - 19.89 + 19.89 * +weight));
    } else {
      setAmountToPay(String(totalPrice));
    }

  }, [weight, selectedItems, totalPrice]);

  const listDates = getDates(new Date(), 30);

  const sendDate = () => {
    const newOrder: IList = {
      dateReceived,
      whatReceived: selectedItems,
      customerNumber,
      hour,
      receivedBy,
      amountToPay,
      paid: cardOrCash === "Do zapłaty" ? false : true,
      cardOrCash,
      weight,
      whoMadeIt: "",
      forWhen,
    };
  };

  const handleSelectChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    if (e.target.value !== "Co przyjęte") {

      if (!selectedItems.includes(String(e.target.value))) {
        setSelectedItems([...selectedItems, String(e.target.value)]);
		
		setSelected([...selected, {
		  price: listThings.filter((item) => item.name === String(e.target.value))[0].price,
		  name: listThings.filter((item) => item.name === String(e.target.value))[0].name,
		  numb: '1'
		}] )
      }

    }
  };
  console.log(selected);
  
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
        <div className="grid gap-4 mb-2 grid-cols-3">
          <div
            className="grid items-start"
            style={{ gridTemplateRows: "repeat(auto-fill, 30px)" }}
          >
            {selectedItems.map((item, i) => (
              <SelectedItem item={item} key={item + i} />
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
              onChange={(e) => setCardOrCash(e.target.value)}
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
        <div className="flex grid gap-4 mb-2 grid-cols-subgrid col-span-1 md:grid-cols-3"></div>
        {/* <MyInput name={'Zaplacone?'} onChange={ (e) => setPaid(e.target.value)} value={paid} /> */}
        {/* <MyInput name={'Kto zrobił?'} onChange={ (e) => setWhoMadeIt(e.target.value)} value={whoMadeIt} /> */}
        <div className=" m-auto text-center flex justify-center items-start gap-2 relative">
          <MyInput
            name={"Do zaplaty"}
            onChange={(e) => setAmountToPay(e.target.value)}
            value={amountToPay}
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
          onClick={sendDate}
          className="w-1/2 m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default Orders;
