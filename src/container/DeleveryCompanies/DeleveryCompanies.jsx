import { useState , useEffect } from "react";
import Search from "./Search";
import AddDeleveryCompane from "./modals/AddDeleveryCompane";
import Table from "../../components/generics/Table";
import EditDeleveryCompane from "./modals/EditDeleveryCompane";
import DeleteDeleveryCompane from "./modals/DeleteDeleveryCompane";
import { BtnAction } from "../../components";
import { getDeleveryCompanies } from "../../utils/api/deleveryCompany";

const DeleveryCompanies = () => {
  const columns = {
    name_ar: "الإسم بالعربي",
    name_en: "الإسم بالإنجيليزي",
    phone: "الهاتف",
    address: "العنوان بالعربي",
    tax_number: "الرقم الضريبي",
  };

  const [rows, setRows] = useState([]);
  const [showEdit, setshowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [showAddPurchase, setshowAddPurchase] = useState(false);
  const [selectedId, setselectedId] = useState(0);
  const handlChange = () => setshowAddPurchase((prev) => !prev);

  useEffect(() => {
    getDeleveryCompanies().then((response) => {
      console.log(response); // Check what you get in the response
      setRows(response);
    }).catch((error) => {
      console.error("Error fetching companies:", error);
    });
  }, []);
  
  return (
    <div dir="rtl" className={`flex flex-col w-full h-full`}>
      <h1 className="w-full text-center underline text-2xl">شركات التوصيل</h1>
      <div className="flex flex-row justify-evenly w-full items-center mt-5">
        <div className="flex gap-2 w-full">
          <BtnAction handlChange={handlChange} />
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
        <EditDeleveryCompane 
        showForm={showEdit} 
        handlChange={()=>setshowEdit((prev)=>!prev)} 
        data={rows[selectedId]}
        />
        <DeleteDeleveryCompane 
        showForm={showDelete} 
        handlChange={()=>setshowDelete((prev)=>!prev)} 
        id={rows[selectedId]?.id}
        />
      </Table>

      <AddDeleveryCompane
        showForm={showAddPurchase}
        handlChange={handlChange}
      />
    </div>
  );
};

export default DeleveryCompanies;
