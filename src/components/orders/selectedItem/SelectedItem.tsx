// Shift + Alt + F
// rafc
'use client'
import { Quantity } from "../quantity/Quantity";
import { ISelectedItem } from "@/app/orders/page";


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