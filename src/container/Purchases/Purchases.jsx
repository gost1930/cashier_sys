import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import Search from "./Search";
import AddPurchase from "./modals/AddPurchase";
import Table from "../../components/generics/Table";
import EditPurchase from "./modals/EditPurchase";
import DeletePurchase from "./modals/DeletePurchase";
import { BtnAction } from "../../components";

const Purchases = () => {
  const columns = [
  "المستخدم",
  "رقم الفاتورة",
  "رقم خارجي",
  "تاريخ الفاتورة",
  "إسم مورد عربي",
  "رقم هاتف",
  "صافي",
  "مرتجع",
  "تم الدفع"
  ];
  const rows = [
    {
      user: "محمد",
      invoice: "1111",
      invoice2: "1111",
      date: "2022-01-01",
      name: "محمد",
      phone: "0111",
      net: 5000,
      returned: 0,
      paid: 0
    }
  ];

  const [showEdit, setshowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [showAddPurchase, setshowAddPurchase] = useState(false);
  const [selectedId, setselectedId] = useState(0);
  const handlChange = () => setshowAddPurchase((prev) => !prev);


  return (
    <div dir="rtl" className={`flex flex-col w-full h-full`}>
      <h1 className="w-full text-center underline text-2xl">المشتريات</h1>
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
      >
        <EditPurchase showForm={showEdit} handlChange={()=>setshowEdit((prev)=>!prev)} />
        <DeletePurchase showForm={showDelete} handlChange={()=>setshowDelete((prev)=>!prev)} />
      </Table>

      <AddPurchase
        showForm={showAddPurchase}
        handlChange={handlChange}
      />
    </div>
  );
};

export default Purchases;
