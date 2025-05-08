import { IList, ISelectedItem, PaidMethod } from "@/app/api/order";

const generateObjectId = (): string =>
  Math.floor(Date.now() / 1000).toString(16) +
  'xxxxxxxxxxxxxxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );

  const randomFromArray = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const randomPrice = () => (Math.random() * 100 + 10).toFixed(2);
  const randomPhone = () => Math.floor(100 + Math.random() * 900).toString();
  const randomHour = () =>
    `${(Math.floor(Math.random() * 9) + 9)
      .toString()
      .padStart(2, '0')}:${(Math.floor(Math.random() * 60)).toString().padStart(2, '0')}`;
  const randomWeight = () => `${(Math.random() * 5 + 1).toFixed(2)} kg`;
  
  const generateItem = (id: number): ISelectedItem => ({
    _id: generateObjectId(),
    price: randomPrice(),
    name: `Produkt ${id}`,
    numb: `${Math.floor(Math.random() * 3) + 1}`,
  });
  
  export const getMockSingleList = (
    day: number,
    month: number,
    year: number
  ): IList[] => {
    const formattedDate = `${day}/${month + 1}/${year}`;
  
    const numberOfOrders = Math.floor(Math.random() * 5) + 3;

    const orders = Array.from({ length: numberOfOrders }, () => ({
      _id: generateObjectId(),
      amountToPay: randomPrice(),
      cardOrCash: randomFromArray([PaidMethod.Cash, PaidMethod.Card, PaidMethod.DoPay]),
      customerNumber: randomPhone(),
      dateReceived: formattedDate,
      forWhen: formattedDate,
      hour: randomHour(),
      paid: Math.random() > 0.5,
      receivedBy: randomFromArray(['Anna', 'Darek', 'Ewa', 'Michał']),
      weight: randomWeight(),
      whatReceived: [generateItem(1), generateItem(2)],
      whoMadeIt: randomFromArray(['', 'Tomek', 'Zosia', 'Kuba']),
    }));
  
    return orders;
  };