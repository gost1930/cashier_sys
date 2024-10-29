import { useState, useEffect } from "react";
import { IoPrintOutline } from "react-icons/io5";
import { LiaUserNurseSolid } from "react-icons/lia";
import { FiUserPlus } from "react-icons/fi";
import Table from "../../components/generics/Table";
import Search from "./Search";
import AddEmployeeModal from "./modals/AddEmployeeModal";
import AddCientOrSupplierModal from "./modals/AddClientOrSupplierModal"
import EditEmployeeModel from "./modals/EditEmployeeModel";
import DeleteResourceModel from "./modals/DeleteResourceModel";
import { getAccounts } from "../../utils/api/account";


const Accounts = ({ contentShow3 }) => {
  const columns = {
    name_ar: "الإسم بالعربي",
    name_en: "الإسم بالإنجيليزي",
    type: "نوع الحساب",
    phone1: "رقم الهاتف1",
    phone2: "رقم الهاتف2",
    fax: "فاكس",
    address: "العنوان",
    country: "البلد",
  };
  const [rows, setRows] = useState([]);

  // add employee
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  // add client or supplier
  const [showClientOrSupplier, setShowClientOrSupplier] = useState(false);
  const [selectedId, setselectedId] = useState(null);
  // actions
  const [showEdit, setshowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);

  const employeeFormhandlChange = () => setShowEmployeeForm((prev) => !prev);
  const clientOrSupplierFormhandlChange = () =>setShowClientOrSupplier((prev) => !prev);
    

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccounts().then((data) => {
      setRows(data);
      setLoading(true);
    })
  }, []);

  return (
    <div dir="rtl" className={`${contentShow3} flex flex-col w-full h-full`}>
      <h1 className="w-full text-center underline text-2xl">الحسابات</h1>
      <div className="flex flex-col md:flex-row justify-evenly w-full items-center mt-5">
        <div className="flex flex-wrap md:flex-row gap-1 md:gap-2 w-full">
          <a
            className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1 cursor-pointer"
            onClick={employeeFormhandlChange}
          >
            أضافة سائق
            <LiaUserNurseSolid className="text-white" />
          </a>
          <a
            className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1 cursor-pointer"
            onClick={clientOrSupplierFormhandlChange}
          >
            إضافة مورد او عميل
            <FiUserPlus className="text-white" />
          </a>
          <a className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 text-white flex items-center gap-1 cursor-pointer">
            طباعة <IoPrintOutline className="text-white" />
          </a>
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
        {selectedId !== null && rows[selectedId] && (
          <EditEmployeeModel
            handlChange={() => setshowEdit((prev) => !prev)}
            showContent={showEdit}
            type={rows[selectedId].type}
            data={rows[selectedId]}

          />
        )}
        <DeleteResourceModel
          handlChange={() => setshowDelete((prev) => !prev)}
          showContent={showDelete}
          id={rows[selectedId]?.id}
        />
      </Table>
      <AddCientOrSupplierModal 
        showForm={showClientOrSupplier}
        handlChange={clientOrSupplierFormhandlChange}
       />
      <AddEmployeeModal
        showForm={showEmployeeForm}
        handlChange={employeeFormhandlChange}
      />
    </div>
  );
};

export default Accounts;