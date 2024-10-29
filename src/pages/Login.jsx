import React, { useEffect, useState } from "react";
import { Forms, Lang } from "../components";
// import logo from '../assets/images/logo.png'
import logo2 from "../assets/images/logo2.png";
import { showErrorAlert } from "../utils/alert";
import { useNavigate } from "react-router-dom";
import { getUsers, login } from "../utils/api/auth";
import { getBuildings } from "../utils/api/building";

const Login = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuidingId, setSelectedBuidingId] = useState();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBuildings()
      .then((b) => {
        setBuildings(b);
        setSelectedBuidingId(b[0].id);
      })
      .catch((e) => {
        console.log(e);
        showErrorAlert("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
      });

  }, []);

  useEffect(() => {
    fetchUsers(selectedBuidingId);
  }, [selectedBuidingId])

  const fetchUsers = (id) => {
    getUsers(id, "HOME")
      .then((u) => {
        setUsers(u);
      })
      .catch((e) => {
        console.log(e);
        showErrorAlert("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
      });
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      showErrorAlert("الرجاء تعبئة اسم المستخدم");
      return;
    }
    if (password === "") {
      showErrorAlert("الرجاء تعبئة كلمة المرور");
      return;
    }

    login(username, password, selectedBuidingId)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/purchase");
        }
      })
      .catch((err) => {
        showErrorAlert(err.message);
      });
  }

  const handlChange = (e) => {
    setUsername(e.target.getAttribute("data_user"));
  };
  return (
    <section className="bg-gray-100 w-full h-[100vh] flex flex-col items-center justify-center pb-10">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-center w-full text-4xl my-6">برنامج الكاشير</h1>
        {/* <img className='w-28' src={logo} alt="" /> */}
        <img className="w-24" src={logo2} alt="" />
      </div>
      <section className="flex mx-auto flex-col-reverse md:flex-row-reverse items-center justify-center  h-fit border border-gray-200 shadow-xl w-fit md:w-[50%]  p-4 ">
        <Forms
          password={password}
          setPassword={setPassword}
          onSubmit={onSubmit}
        />
        <div dir="rtl" className="flex flex-col w-fit md:w-[60%] h-full pr-2">
          <form action="">
            {
              buildings.length > 0 && <div className="flex flex-row items-center justify-center">
              <label htmlFor="buidings">المنشآت</label>
              <select
                value={selectedBuidingId}
                onChange={(e) => setSelectedBuidingId(e.target.value)}
                className="block appearance-none  bg-gray-50 border border-gray-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="buidings"
                id="buidings"
              >
                {buildings.map((b, index) => (
                  <option
                    key={index}
                    className="p-2 min-w-full border-none "
                    value={b.id}
                  >
                    {b.name_ar}
                  </option>
                ))}
              </select>
            </div>
             }
          </form>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full h-[60%] overflow-y-auto  px-2 my-5">
            {users.map((user, index) => (
              <p
                key={index}
                className={
                  username === user.username
                    ? "bg-gray-300 p-6 text-center h-fit shadow-md hover:shadow-xl cursor-pointer border rounded-xl"
                    : "p-6 text-center h-fit shadow-md hover:shadow-xl bg-gray-50 hover:bg-gray-100 cursor-pointer border rounded-xl"
                }
                data_user={user.username}
                onClick={handlChange}
              >
                {user.username}
              </p>
            ))}
          </div>
          <Lang />
        </div>
      </section>
    </section>
  );
};

export default Login;
