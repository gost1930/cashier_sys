import BtnLink from "./BtnLink";
import { FaBarsStaggered } from "react-icons/fa6";
import category from "../../assets/images/category.png";
import setting from "../../assets/images/setting.png";
import unit from "../../assets/images/menu.png";
import delevery from "../../assets/images/express-delivery.png";
import table from "../../assets/images/discussion.png";
import log_out from "../../assets/images/log-out.png";
import { logout } from "../../utils/api/auth";
import { showErrorAlert, showSuccessAlert } from "../../utils/alert";
import { json, useNavigate } from "react-router-dom";
import Btn from "./Btn";
import residential from "../../assets/images/residential.png";
import { Link } from "react-router-dom";
import DropDOwn from "./DropDOwn";
import { useState } from "react";

const SidBar = ({ showContent, handlChange }) => {
  const [show, setShow] = useState(false); // تغيير القيمة الابتدائية إلى false
  const is_super_user = JSON.parse(localStorage.getItem("user")).is_super_user;

  const handlShow = () => setShow((prev) => !prev);
  const navigate = useNavigate();
  const signOut = () => {
    logout().then((res) => {
      showSuccessAlert("تم تسجيل الخروج بنجاح");
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <>
      <div>
        <nav className="flex flex-row justify-between items-center bg-gray-100 px-2">
          <FaBarsStaggered
            className="cursor-pointer text-2xl text-black"
            onClick={handlChange}
          />
        </nav>
      </div>

      <div className="relative">
        <section
          className={`${showContent} absolute top-0 h-full duration-300 ease-in-out border border-gray-500`}
        >
          <Link to={"/group"}>
            <Btn
              title={"المجموعات"}
              btn={<img src={category} className="w-12 h-12" />}
            />
          </Link>

          <div onClick={handlShow} className="relative">
            <Btn
              title={"الإعدادات"}
              btn={<img src={setting} className="w-12 h-12" />}
            />
            <DropDOwn showDropDown={show} />
          </div>
          {is_super_user && (
            <Link to={"/build"}>
              <Btn
                title={"المنشآت"}
                btn={<img src={residential} className="w-12 h-12" />}
              />
            </Link>
          )}
          <Link to={"/unit"}>
            <Btn
              title={"الوحدات"}
              btn={<img src={unit} className="w-12 h-12" />}
            />
          </Link>
          <Link to={"/delevery_companie"}>
            <Btn
              title={"الشحن"}
              btn={<img src={delevery} className="w-12 h-12" />}
            />
          </Link>
          <Link to={"/table"}>
            <Btn
              title={"الطاولات"}
              btn={<img src={table} className="w-12 h-12" />}
            />
          </Link>
          <Btn
            title={"تسجيل الخروج"}
            onClick={signOut}
            btn={<img src={log_out} className="w-12 h-12 rotate-180" />}
          />
        </section>
      </div>
    </>
  );
};
export default SidBar;
