import { Route, Routes } from 'react-router';
import './App.scss';
import Auth from '../../../auth-main/client/src/features/auth'
import Main from '../../../auth-main/client/src/features/pages/Main';
import { useSelector } from 'react-redux';
import Weather from '../../../auth-main/client/src/features/weather';
import {Profiler, useEffect} from 'react';
import { refresh } from '../../../auth-main/client/src/store/auth/AuthThunks';
import { RootState, useAppDispatch } from '../../../auth-main/client/src/store/store';
import Profile from "../../../auth-main/client/src/features/weather/components/Profile";
import Layout from "../../../auth-main/client/src/features/weather/components/Layout";

function App() {
  const {isAuth} = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(refresh())
    
    const authInterval = setInterval(() => {
      dispatch(refresh())
    }, 1000 * 60 * 60 )

    return () => {
      clearInterval(authInterval)
    }
  }, [])

  return (
    <div className="App">
          <div>
              <Routes>
                {isAuth ? <Route path="/" element={<Layout><Weather/></Layout>} /> : <Route path="/" element={<Main/>} />}
                {isAuth && <Route path="/profile" element={<Layout><Profile/></Layout>} />}
                <Route path="/register" element={<Auth type="register"/>} />
                <Route path="/login" element={<Auth type="login"/>} />
                <Route path="/reset-password/:id" element={<Auth type="reset"/>} />
                <Route path="/reset-password-request" element={<Auth type="reset-request"/>} />
              </Routes>
          </div>
    </div>
  );
}

export default App;
