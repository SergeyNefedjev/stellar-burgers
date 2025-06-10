import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUserOrders, getOrders } from '../../services/slices/user-slice';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
