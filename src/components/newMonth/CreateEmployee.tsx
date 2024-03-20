import { useState } from 'react';
import MyInput from '../myInput/MyInput';

interface ICreateEmployee {
    addEmployee: (name: string, position: string) => void,
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateEmployee = ({ addEmployee, setShow }: ICreateEmployee) => {
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
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className="grid gap-4 mb-2 md:grid-cols-2">
                <div>
                    <MyInput name={'Imię:'} onChange={ (e) => setFirstName(e.target.value) } value={firstName} />
                </div>
                <div>
                    <MyInput name={'Nazwisko:'} onChange={ (e) => setLastName(e.target.value) } value={lastName} />
                </div>
            </div>
            <div className="grid gap-4 mb-2 md:grid-cols-2">
                <div>
                    <MyInput name={'Pozycja:'} onChange={ (e) => setPosition(e.target.value) } value={position} />
                </div>
                <div>
                    <MyInput name={'Numer telefonu:'} onChange={ (e) => setPhone(e.target.value) } value={phone} />
                </div>
            </div>
            <button
                type="submit"
                className="m-auto px-4 py-2 mt-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    Dodaj
            </button>
        </form>
    );
};

export default CreateEmployee;
