import { useState } from 'react';
import MyInput from '../myInput';

interface ICreateEmployee {
    addEmployee: (name: string, position: string) => void,
    setShow?: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen:boolean
}

const CreateEmployee = ({ addEmployee, setShow, isOpen }: ICreateEmployee) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addEmployee(firstName + ' ' + lastName, position);
        setFirstName('');
        setLastName('');
        setPosition('');
        setPhone('');


        setShow && setShow(false);
    };

    return (
        isOpen && (
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className="grid gap-4 mb-2 md:grid-cols-2">
                        <MyInput name={'Imię'} setValue={ setFirstName } value={firstName} />
                        <MyInput name={'Nazwisko'} setValue={ setLastName } value={lastName} />
                </div>
                <div className="grid gap-4 mb-2 md:grid-cols-2">
                        <MyInput name={'Pozycja'} setValue={ setPosition } value={position} />
                        <MyInput name={'Numer telefonu'} setValue={ setPhone } value={phone} />
                </div>
                <button
                    type="submit"
                    className="m-auto px-4 py-2 mt-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Dodaj
                </button>
            </form>
        )
    );
};

export default CreateEmployee;
