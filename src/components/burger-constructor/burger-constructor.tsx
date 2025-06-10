import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/store';
import { selectUser } from '../../services/slices/user-slice';
import {
  selectCombination,
  selectOrderRequest,
  getOrder,
  selectOrderDataModal,
  closeModal
} from '../../services/slices/constructor-slice';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectCombination);
  const user = useSelector(selectUser);
  const orderRequest = useSelector(selectOrderRequest);
  const navigate = useNavigate();
  const orderModalData = useSelector(selectOrderDataModal);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const order = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
    if (user) {
      dispatch(getOrder(order));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
