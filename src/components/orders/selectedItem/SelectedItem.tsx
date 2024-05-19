import { ISelectedItem } from "@/app/api/order";
import { Quantity } from "../quantity/Quantity";
import s from './SelectedItem.module.scss';

interface ISelectedItemProps {
  item: ISelectedItem;
  increaseItemCount: (id: number, quantity: string) => void;
}

const SelectedItem = ({ item, increaseItemCount }: ISelectedItemProps) => {
  return (
    <div className={s.container + " flex items-center"}>
      <button className={s.deleteBttn} onClick={() => 
        { /* Your delete logic here */ }}>
        X
      </button>
      {item.name}
      <Quantity increaseItemCount={increaseItemCount} id={item.id} />
    </div>
  );
};

export default SelectedItem;
