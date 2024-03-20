
interface IMyInput {
    name: string,
    value: string,
    onChange: (e: {
        target: {
            value: React.SetStateAction<string>;
        };
    }) => void
}

const MyInput = ({ name, onChange, value }: IMyInput) => {

    return (
        <div className="block">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
            {name}:
        </label>
            <input
                type="text"
                id={name}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder={name}
                required
                value={value}
                onChange={ onChange} />
        </div>
    );
};

export default MyInput;