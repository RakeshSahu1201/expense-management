import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppSkeleton from "./components/AppSkeleton";
import TiffinSheet from "./components/TiffinSheet";
import DashBoard from "./components/DashBoard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppSkeleton Component={DashBoard} />} />
          <Route
            path="/morning-tiffin"
            element={<AppSkeleton Component={TiffinSheet} day_time="morning" />}
          />
          <Route
            path="/night-tiffin"
            element={<AppSkeleton Component={TiffinSheet} day_time="night" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
