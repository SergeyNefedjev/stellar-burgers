import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUser)?.name || '';
  return <AppHeaderUI userName={userName} />;
};
