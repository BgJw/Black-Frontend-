import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/components/hooks/store';
import { fetchMonth } from '../../slices/scheduleSlice';

const useFetchMonth = () => {
  const { year, month } = useAppSelector(store => store.scheduleSlice);
  const session = useSession();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    session.data?.user &&
      dispatch(fetchMonth({ department: String(session.data.user.name), month: month.name, year }));
  }, [month, year, session.data?.user?.name]);


};

export default useFetchMonth;
