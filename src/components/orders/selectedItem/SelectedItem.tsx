import { ISelectedItem } from "@/app/api/order";
import { Quantity } from "../quantity/Quantity";
import { Button } from "flowbite-react";

import s from './SelectedItem.module.scss';

interface ISelectedItemProps {
  item: ISelectedItem;
  increaseItemCount: (id: number, quantity: string) => void;
  removeSelectedItems: (itemId: number) => void
}

const SelectedItem = ({ item, increaseItemCount, removeSelectedItems }: ISelectedItemProps) => {

  return (
    <div className={s.container + " flex items-center"}>
      <Button 
          size="xs" 
          color='failure' 
          className={s.deleteBttn} 
          onClick={ () => removeSelectedItems(item.id) }>
        X
      </Button>
      {item.name}
      <Quantity increaseItemCount={increaseItemCount} id={item.id} />
    </div>
  );
};

export default SelectedItem;
