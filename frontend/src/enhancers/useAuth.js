import { useContext } from 'react';
import { AuthContext } from 'utils/authentication';

export const useAuth = () => useContext(AuthContext);

export default useAuth;
