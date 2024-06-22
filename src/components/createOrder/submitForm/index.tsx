import { IList, addNewOrder, incrementClientNumber } from "@/app/api/order";
import { fetchActiveSession } from "@/app/api/session";
import { useAppDispatch } from "@/hooks/store";
import { update } from "@/slices/notificationSlice";
import { Button } from "@material-tailwind/react";


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

    const sendDate = async (newOrder: IList) => {
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
        return;
    } else {
      const day = +forWhen.split('/')[0];
      const month = +forWhen.split('/')[1];
      const year = +forWhen.split('/')[2];
      const {username} = await fetchActiveSession();
      const body = {
        department: username,
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
          weight:'kg',
          whoMadeIt,
        }],
      }
      const req = addNewOrder(body)
      
      req.then(res => {
        if(res.success) {
          incrementClientNumber();
          dispatch(update(res.message));
          resetAll();
        }
        
      });

    }

  }

  return (
    <Button
      onClick={ () => sendDate(newOrder)}
      color={'green'}
      className="hover:bg-green-400"
    >
      Zapisz
    </Button>
    )
}
