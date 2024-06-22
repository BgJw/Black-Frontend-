import { ISelectedItem } from "@/app/api/order";
import { ChangeEventHandler, memo, useCallback, useState } from "react";

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
  

interface ISelectForm {
    selectedItems: ISelectedItem[];
    setSelectedItems: (value: ISelectedItem[]) => void;

}
const SelectForm = memo(({selectedItems, setSelectedItems  }: ISelectForm) => {
  const [selectedValue, setSelectedValue] = useState('');
    const listName = listThings.map((item) => item.name);
    const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    
        const newItems = listThings.find( item => item.name === e.target.value);
        
        if(newItems && !selectedItems.find( items => items.name === newItems.name)){
            setSelectedItems([...selectedItems, {...newItems, numb: '1'} as ISelectedItem]);
            setSelectedValue('');
        }
      },[selectedItems]);


  return (
    <div className="mb-2 w-full">
      <label
        htmlFor={'Co przyjęte'}
        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
      >
        {'Co przyjęte'}:
      </label>
      <select
        id={'Co przyjęte'}
        value={selectedValue}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
        onChange={(e) => {
          setSelectedValue(e.target.value);
          handleSelectChange(e);
      }}
      >
        <option value={''} disabled>Co przyjęte</option>
        {listName.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectForm;
