import { ISelectedItem } from "@/app/api/order";
import SelectedItem from "../selectedItem/SelectedItem"
import { memo } from "react";

interface IItems {
    selectedItems: ISelectedItem[];
    setSelectedItems: React.Dispatch<React.SetStateAction<ISelectedItem[]>>;
}

export const Items = memo(({selectedItems, setSelectedItems}: IItems) => {

    const increaseItemCount = (id: number, quantity: string) => {
        const index = selectedItems.findIndex((item) => item.id === id);
        if (index !== -1) {
          const newItems = [...selectedItems];
          newItems[index].numb = quantity;
          setSelectedItems(newItems);
        }
      } 
    

  return (
    <div
        className="grid items-start gap-2"
        style={{ gridTemplateRows: "repeat(auto-fill, 30px)" }}>
          {
            selectedItems.map( item => (
              <SelectedItem item={item} key={item.id} increaseItemCount={increaseItemCount} />
            ))
          }
  </div>
  )
});
