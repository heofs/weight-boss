import { useContext } from 'react';
import { DataContext } from 'utils/firestore';

export const useFirestore = () => useContext(DataContext);
