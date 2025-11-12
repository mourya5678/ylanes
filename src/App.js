import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Suspense, useEffect } from "react";
import { AllRoutes } from "./routes/PageRoutes";
import PrivateRoutes from "./layout/PrivateRoutes";
import { message } from "antd";
import Loader from "./layout/Loader";
import NormalRoute from "./layout/NormalRoute";

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isInstagram = ua.includes("Instagram");
    if (isInstagram) {
      console.log("Inside Instagram browser");
    } else {
      console.log("Not !!")
    }
  }, []);

  return (
    <div>
      {contextHolder}
      <Suspense fallback={<Loader />}>
        <Routes>
          {AllRoutes?.map((item, index) => (
            item?.isPrivate ?
              <Route
                key={index}
                path={item?.path}
                element={
                  <PrivateRoutes messageApi={messageApi}>
                    {item?.element}
                  </PrivateRoutes>
                }
              />
              :
              <Route
                key={index}
                path={item?.path}
                element={
                  <NormalRoute messageApi={messageApi}>
                    {item?.element}
                  </NormalRoute>
                }
              />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;