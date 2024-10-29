import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Search from "./Search";
import DeleteBuilding from "./modals/DeleteBuilding";
import Table from "../../components/generics/Table";
import { getBuildings } from "../../utils/api/building";
import AddForm from "./modals/AddForm";
import UpdateForm from "./modals/UpdateForm";

const Building = () => {
  const columns = {
    name_ar: "الإسم بالعربي",
    name_en: "الإسم بالإنجيليزي",
    phoneNumber: "رقم الهاتف1",
    phoneNumber2: "رقم الهاتف2",
    tax_number: "الرقم الضريبي",
    address:"العنوان",
  };
  
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setselectedId] = useState();
  const [rows, setRows] = useState([])
  // actions
  const [showEdit, setshowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);

  useEffect(() => {
    getBuildings().then((data) => {
      setRows(data)
    })
  }, [])
  
  const handlChange = () => {
    setShowForm((prev) => !prev);
  };

 
  return (
    <section
      className={`flex flex-col justify-center items-start w-full h-fit`}
    >
      <h1 className="w-full text-center underline text-2xl">المنشآت</h1>
      <div className="flex w-full flex-row justify-evenly items-center mt-5">
        <div className="flex gap-2 w-full">
          <a
            className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1 cursor-pointer"
            onClick={handlChange}
          >
            إضافة <MdAddShoppingCart className="text-white" />{" "}
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
        {/* edit Form */}
        <DeleteBuilding
          handlChange={() => setshowDelete((prev) => !prev)}
          showDeleteForm={showDelete ? "" : "hidden"}
          id={rows[selectedId]?.id}
        />
        {/* update Form */}
        {
          showEdit && <UpdateForm data={rows[selectedId]} setShowForm={()=>setshowEdit((prev)=>!prev)} />
        }
      </Table>
      {/* add form */}
      {showForm && <AddForm setShowForm={() => setShowForm((prev) => !prev)} />}
    </section>
  );
};

export default Building;
