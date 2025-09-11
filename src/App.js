import { Route, Routes } from 'react-router';
import './App.css';
import { Suspense, useEffect } from 'react';
import { AllRoutes } from './routes/PageRoutes';
import PrivateRoutes from './layout/PrivateRoutes';
import { message } from 'antd';
import Loader from './layout/Loader';

function App() {
  const [messageApi, contextHolder] = message.useMessage();

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