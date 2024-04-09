import { IList, addNewOrder } from "@/app/api/order";
import { useAppDispatch } from "@/components/hooks/store";
import { update } from "@/slices/notificationSlice";


  const namePropsOrder = {
    whatReceived: 'Co przyjęte',
    dateReceived: 'Data przyjęcia',
    customerNumber: 'Nr klienta',
    receivedBy: 'Kto przyjąl',
    cardOrCash: 'Metoda oplaty',
    hour: 'Godzina odbioru',
    forWhen: 'Na kiedy ?',
  }
  const naming = [
    'Co przyjęte',
    'Data przyjęcia',
    'Nr klienta',
    'Kto przyjąl',
    'Metoda oplaty',
    'Godzina odbioru',
    'Na kiedy ?',
  ]

export const SubmitForm = ({newOrder,  resetAll}: {newOrder: IList, resetAll: () => void}) => {
  const dispatch = useAppDispatch();
  const isWeight = newOrder.whatReceived.find( item => item.name === 'pranie + magieł') 

    const sendDate = (newOrder: IList) => {
      const {dateReceived, whatReceived, customerNumber, receivedBy, amountToPay, paid, cardOrCash, hour, forWhen, whoMadeIt } = newOrder

      naming.forEach(fieldName => {
        document.getElementById(fieldName)?.classList.remove('input-error');
    });

      if(whatReceived.length === 0){
        document.getElementById(namePropsOrder.whatReceived)?.classList.add('input-error')
      }
      if(!dateReceived) {
        document.getElementById(namePropsOrder.dateReceived)?.classList.add('input-error')
      }
      if(!customerNumber) {
        document.getElementById(namePropsOrder.customerNumber)?.classList.add('input-error')
      }
      if(!receivedBy) {
        document.getElementById(namePropsOrder.receivedBy)?.classList.add('input-error')
      }
      if(!hour) {
        document.getElementById(namePropsOrder.hour)?.classList.add('input-error')
      }
      if(!cardOrCash) {
        document.getElementById(namePropsOrder.cardOrCash)?.classList.add('input-error')
      }
      if(!forWhen) {
        document.getElementById(namePropsOrder.forWhen)?.classList.add('input-error')
      }
      if (!dateReceived || !whatReceived || !customerNumber || !receivedBy || !amountToPay || !hour || !forWhen) {
        
        dispatch(update('Proszę wypełnić wszystkie wymagane pola'))
        // resetAll()
        return;
    } else {
      const day = +forWhen.split('/')[0];
      const month = +forWhen.split('/')[1];
      const year = +forWhen.split('/')[2];

      const body = {
        department: 'Zaspa',
        day,
        month,
        year,
        orders: [{
          dateReceived,
          whatReceived,
          customerNumber,
          receivedBy,
          amountToPay,
          paid,
          cardOrCash,
          hour,
          forWhen,
          weight:' kg',
          whoMadeIt,
        }],
      }
      const req = addNewOrder(body)
      
      req.then(res => {
        if(res.success)
          dispatch(update(res.message))
      })

    }

  }

  return (
    <button
      onClick={ () => sendDate(newOrder)}
      className="w-1/2 m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Zapisz
    </button>
    )
}
