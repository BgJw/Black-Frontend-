import { ChangeEventHandler, memo } from "react";

interface IMyInput {
    name: string,
    value: string,
    setValue: (value: string) => void,
    disabled?: boolean 
}

const MyInput = memo(({ name, value, setValue, disabled }: IMyInput) => {

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }
    
    return (
        <div className="block">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
            {name}:
        </label>
            <input
                type="text"
                id={name}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 disabled:opacity-60"
                placeholder={name}
                required
                value={value}
                disabled={disabled ? disabled: false}
                onChange={ onChange} />
        </div>
    );
});

export default MyInput;