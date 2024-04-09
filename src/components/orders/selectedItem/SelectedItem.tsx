// Shift + Alt + F
// rafc
'use client'
import { ISelectedItem } from "@/app/api/order";
import { Quantity } from "../quantity/Quantity";


interface ISelectedItemProps {
  item: ISelectedItem;
  increaseItemCount: (id: number, quantity: string) => void;
}


const SelectedItem = ({item, increaseItemCount}: ISelectedItemProps) => {

    
  return (
    <div className="flex items-center">
      {
        item.name
      }
        <Quantity increaseItemCount={increaseItemCount} id={item.id}/>
    </div>
  )
}


export default SelectedItem