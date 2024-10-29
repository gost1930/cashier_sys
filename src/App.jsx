import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import NotRequiredAuth from "./components/NotRequiredAuth";
import {
  Login,
  Purchase,
  Account,
  SubGroup,
  Group,
  Build,
  Sale,
  Unit,
  DeleveryCompanie,
  Table,
  Sign,
  Discount,
  DefaultSetting,
  UserOperaion,
  Home,
  Report,
  ExcelPage,
} from "./pages";
import { TotalDayInvoices } from "./components";
import { Returned } from "./container";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<NotRequiredAuth />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/subGroup" element={<SubGroup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/group" element={<Group />} />
            <Route path="/build" element={<Build />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/unit" element={<Unit />} />
            <Route path="/delevery_companie" element={<DeleveryCompanie />} />
            <Route path="/table" element={<Table />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/default_setting" element={<DefaultSetting />} />
            <Route path="/user_operation" element={<UserOperaion />} />
            <Route path="/report" element={<Report />} />
            <Route path="/totalDay" element={<TotalDayInvoices />} />
            <Route path="/Returned" element={<Returned />} />
            <Route path="/excel" element={<ExcelPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;