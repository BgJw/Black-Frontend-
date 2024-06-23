import { ISelectedItem } from "@/app/api/order";
import SelectedItem from "../selectedItem"
import { memo } from "react";

interface IItems {
    selectedItems: ISelectedItem[];
    setSelectedItems: React.Dispatch<React.SetStateAction<ISelectedItem[]>>;
}

export const Items = memo(({selectedItems, setSelectedItems}: IItems) => {

    const increaseItemCount = (id: string, quantity: string) => {
        const index = selectedItems.findIndex((item) => item._id === id);
        if (index !== -1) {
          const newItems = [...selectedItems];
          newItems[index].numb = quantity;
          setSelectedItems(newItems);
        }
      };
       
      const removeSelectedItems = (itemId: string) => {
        const newList = selectedItems.slice().filter( items => items._id !== itemId)
        setSelectedItems( newList );
      };
      
  return (
    <div
        className="grid items-start gap-2 w-full"
        style={{ gridTemplateRows: "repeat(auto-fill, 30px)" }}>
          {
            selectedItems.length === 0 && (
              <div className="text-center text-gray-500">
                <p>Brak</p>
              </div>
            )
          }
          {
            selectedItems.map( item => (
              <SelectedItem 
                  item={item} 
                  key={item._id} 
                  increaseItemCount={increaseItemCount} 
                  removeSelectedItems={removeSelectedItems}
                  />
            ))
          }
  </div>
  )
});
