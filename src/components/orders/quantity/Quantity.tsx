import { ChangeEventHandler, useEffect, useState } from "react";

interface IQuantity {
  id: number;
  increaseItemCount: (id: number, quantity: string) => void;
}

export const Quantity = ({id, increaseItemCount}: IQuantity) => {
  const [quantity, setQuantity] = useState('1');


  const validateInput:ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value.trim();

    if (inputValue === "" || /^(\d*\.?\d+|\d+\.?\d*|\d*\.?\d+)$/.test(inputValue)) {
        const newValue = inputValue === "0" ? "" : inputValue; 
        setQuantity(newValue);
        increaseItemCount(id, newValue);
    }
  }
  const decrementFloatNumber = (numb: string) => {
    let [first, second] = numb.split('.');
    
    if (second) {
        if (Number(second) === 0) {
            return (Number(first) - 1).toString();
        } else {
            return (Number(first) - 1) + '.' + second;
        }
    } else {
        return (Number(first) - 1).toString();
    }
}

const incrementFloatNumber = (numb: string) => {
    let [first, second] = numb.split('.');

    if (second) {
        return (Number(first) + 1) + '.' + second;
    } else {
        return (Number(first) + 1).toString();
    }
}

    useEffect( () => increaseItemCount(id, quantity), [quantity]);
    
  return (
    <form className="max-w-xs ml-auto">
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-gray-100 :bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 h-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
          onClick={ () => setQuantity(decrementFloatNumber(quantity))}
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          data-input-counter-min="1"
          data-input-counter-max="50"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-5 text-center border text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
          placeholder="999"
          value={quantity}
          onChange={(e) => validateInput(e) }
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-3 h-5 focus:ring-gray-100 :focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={ () => setQuantity(incrementFloatNumber(quantity))}
        >
          <svg
            className="w-3 h-3 text-gray-900 :text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
