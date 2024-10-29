import { useEffect, useState } from "react";
import Table from "../../components/generics/Table";
import { MdAddShoppingCart } from "react-icons/md";
import Search from "./Search";
import DeleteUser from "./modals/DeleteUser";
import { getUsers } from "../../utils/api/auth";
import AddUser from "./modals/AddUser";
import EditUser from "./modals/EditUser";
import { getBuildings } from "../../utils/api/building";
// import EditUser from "./modals/EditUser";

const SignIn = () => {
  const columns = {
    username: "اسم المستخدم",
  };
  const [showEdit, setshowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [showAdd, setshowAdd] = useState(false);
  const [rows, setRows] = useState([])
  const [selectedId, setselectedId] = useState(0);
  const [buildings, setBuildings] = useState([]);
  const buildingID = JSON.parse(localStorage.getItem("user")).building_id;
   
  useEffect(() => {
    const building_id = JSON.parse(localStorage.getItem("user")).building_id;
    
    getBuildings()
      .then((b) => {
        setBuildings(b);
      })
      .catch((e) => {
        console.log(e);
        // showErrorAlert("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
      });
    
    getUsers(building_id, "ADD_USER")
      .then((data) => setRows(data))
      .catch((err) => console.log(err))
    
  }, [])

  const handlChange = () => setshowAdd((prev) => !prev);

  return (
    <div dir="rtl" className={`flex flex-col w-full h-full`}>
      <h1 className="w-full text-center underline text-2xl">المستخدمين</h1>
      <div className="flex flex-row justify-evenly w-full items-center mt-5">
        <div className="flex gap-2 w-full">
          {buildings.length === 0 || !buildingID ? (
            <p className="m-4">
              {" "}
              لا يمكنك اضافة مستخدم جديد حتى تضيف منشأة جديدة وتقوم باعادة تسجيل
              الدخول من جديد
            </p>
          ) : (
            <a
              className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1 cursor-pointer"
              onClick={handlChange}
            >
              إضافة <MdAddShoppingCart className="text-white" />{" "}
            </a>
          )}
        </div>
        {/* search bar here  */}
        <Search />
      </div>

      <Table
        columns={columns}
        rows={rows}
        setselectedId={setselectedId}
        setshowEdit={setshowEdit}
        setshowDelete={setshowDelete}
        dontPrint={true}
      >
        <EditUser
          showForm={showEdit ? "" : "hidden"}
          handlChange={() => setshowEdit((prev) => !prev)}
          fieldsValues={rows[selectedId]}
        />
        <DeleteUser
          showForm={showDelete}
          handlChange={() => setshowDelete((prev) => !prev)}
          id={rows[selectedId]?.id}
        />
      </Table>
      <AddUser
        showForm={showAdd ? "" : "hidden"}
        handlChange={() => setshowAdd((prev) => !prev)}
      />
    </div>
  );
};

export default SignIn;
