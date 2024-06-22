import { ISelectedItem } from "@/app/api/order";
import { Quantity } from "../quantity";
import { Button } from "flowbite-react";


interface ISelectedItemProps {
  item: ISelectedItem;
  increaseItemCount: (id: number, quantity: string) => void;
  removeSelectedItems: (itemId: number) => void
}

const SelectedItem = ({ item, increaseItemCount, removeSelectedItems }: ISelectedItemProps) => {

  
  return (
    <div className=" flex items-center justify-end gap-2 whitespace-nowrap">
      <Button 
          size="xs" 
          color='failure' 
          className='max-w-xs max-h-xs -p-2' 
          onClick={ () => removeSelectedItems(item.id) }>
        X
      </Button>
      <span className="inline-block max-w-sm whitespace-nowrap overflow-hidden text-ellipsis" 
            title={item.name}>
              {item.name}
      </span>
      <Quantity increaseItemCount={increaseItemCount} item={item} />
    </div>
  );
};

export default SelectedItem;
