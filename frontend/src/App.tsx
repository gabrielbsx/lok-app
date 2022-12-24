
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import api from './services/api';
import FooterCompenent from './components/Footer';
import Router from './components/Router';
import Socket from './components/Socket';
// import { MessengerChat } from './facebook-chat';
import { RootState } from './redux/reducer';
import { setUser } from './redux/reducers/user.reducer';
import { IResponseAuth, IResponseRefresh } from './@types/User';
import Sound from './components/Sound';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user.user);
  const [invite, setInvite] = useState<boolean>();

  useMemo(() => {
    if (user?.email === null) {
      toast.dark('Você precisa estar logado para acessar o site.', {
        type: 'info',
        position: 'top-right',
        delay: 2000,
      });
    }
  }, []);


  useMemo(() => {
    const refreshAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.put<IResponseRefresh>('/users/refresh');

          if (data.statusCode === 200) {
            const { user } = data;
            dispatch(setUser(user));
            await refreshAuth();
            return;
          }

          localStorage.removeItem('token');
        } catch (error) {
          if (!localStorage.getItem('token')) {
            return;
          }

          error as Error | AxiosError
          console.log('App Error: ', error);

          localStorage.removeItem('token');
          dispatch(setUser(null));

          toast.dark('Você foi deslogado.', {
            type: 'error',
            position: 'top-right',
            delay: 2000,
          });
        }
      }
    };
    refreshAuth();
  }, []);

  return (
    <>
      {/* <div className='bg-black justify-center flex flex-row md:flex-col lg:flex-row'> 
        <div className='bg-red-800 flex w-100'>F1</div>
        <div className='bg-green-800 flex w-100'>F2</div>
      </div> */}
      <div className="min-h-screen justify-between flex flex-col">
        <GoogleReCaptchaProvider
          reCaptchaKey='6LddtIIgAAAAAJiS7_FQzpjaURU-BrhrrGQtj3US'
          language='pt-BR'
        >
          <Router />
        </GoogleReCaptchaProvider>
        <ToastContainer />
        <FooterCompenent />
      </div>
    </>
  );
}

export default App;
