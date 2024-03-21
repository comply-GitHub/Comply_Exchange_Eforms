import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../Utils/storage';

function PrivateRoute({ children }: any) {
  const auth = getAccessToken();
  console.log(auth,"90")
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
