import { useAppSelector } from '@/components/hooks/store';
import { getDayOfWeek, isWeekend } from '@/helpers/isWeekend';
import s from './dayCell.module.scss';




const DayCell = ({ day }: {day: number}) => {
    const month = useAppSelector( store => store.scheduleSlice.month);
    const year = useAppSelector( store => store.scheduleSlice.year);


    const dayOfWeek = getDayOfWeek(year, month.numb, day);
      
    return (
        <>
            {
                day === 0 ?
                    <div className={s.firstCell + ' cell bg-slate-200'}>
                        <span>Data</span>
                        <hr />
                        <span>Pracownik</span> 
                    </div>
                    :
                    <div 
                        className={s.cell + ' cell whitespace-nowrap truncate text-center'}
                        style={ isWeekend(dayOfWeek)}>
                        {day + '.' + (month.numb + 1) + ' ' + dayOfWeek}
                    </div>
            }
        </>
    );
};

export default DayCell;