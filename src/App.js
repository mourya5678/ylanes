import { Route, Routes } from 'react-router';
import './App.css';
import { Suspense, useEffect } from 'react';
import { AllRoutes } from './routes/PageRoutes';
import PrivateRoutes from './layout/PrivateRoutes';
import { message } from 'antd';
import AgoraRTM from 'agora-rtm-sdk';
import Loader from './layout/Loader';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const APP_ID = "611227230#1418219";
  // const client = AgoraRTM.createInstance(APP_ID)

  useEffect(() => {
    const connect = async () => {
      // await client.login({

      // })
    };
    connect();
  }, []);

  return (
    <div>
      {contextHolder}
      <Suspense fallback={<Loader />}>
        <Routes>
          {AllRoutes?.map((item) => (
            <Route
              exact
              path={item?.path}
              element={<PrivateRoutes messageApi={messageApi}>{item?.element}</PrivateRoutes>}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;