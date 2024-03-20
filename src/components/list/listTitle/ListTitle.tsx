const titleList = ['/', 'Data przyjęcia', 'Co przyjęte', 'Nr klienta', 'Kto przyjąl', 'Ile do zaplaty', 'Zaplacone?', 'Karta/Got', 'Waga', 'Kto zrobił?', 'Godzina'];

const ListTitle = () => {
    return (
        <ul className='flex bg-slate-200'>
        {
            titleList.map(el => (
                <li key={el}>{el}</li>
            ))
        }
    </ul>
    );
};

export default ListTitle;