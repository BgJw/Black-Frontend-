import React, { ChangeEventHandler } from "react";

interface IMySelect {
  name: string;
  options: any[];
  onChange:  ChangeEventHandler<HTMLSelectElement>;
}
const MySelect = ({ name, options, onChange }: IMySelect) => {
  return (
    <form className="max-w-sm mb-2 w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
      >
        {name}:
      </label>
      <select
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
        onChange={onChange}
      >
        <option value={name}>{name}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </form>
  );
};

export default MySelect;
