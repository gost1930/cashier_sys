import { useEffect, useState } from "react";
import Table from "../../components/generics/Table";
import SubGroupForm from "./forms/SubGroup";
import Search from "./Search";
import DeleteSubGroupModal from "./modals/DeleteSubGroupModal";
import { BtnAction } from "../../components";
import { getCategories } from "../../utils/api/categories";
import { showErrorAlert } from "../../utils/alert";

const SubGroups = ({ contentShow2 }) => {
  const columns = {
    name_ar:"إسم عربي",
    name_en:"إسم إنجليزي",
    min_quantity:"ك.حالية",
    cost_price:"س.التكلفة",
    purchase_price:"س.الشراء",
    sale_price:"س.البيع",
  };
  
  const [rows, setRows] = useState([]);
  const [selectedId, setselectedId] = useState(null);
  const [showEdit, setshowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [showAddSubGroup, setshowAddSubGroup] = useState(false);

  useEffect(() => {
    getCategories()
    .then((data) => {
      setRows(data);
    })
    .catch((err) => {
      console.log(err);
      showErrorAlert
    });
  }, [])
  

  const handlChange = () => setshowAddSubGroup((prev) => !prev);

  return (
    <section
      className={`${contentShow2} flex flex-col justify-center items-start w-full h-fit`}
    >
      <h1 className="w-full text-center underline text-2xl">الاصناف</h1>
      <div className="flex w-full flex-row justify-evenly items-center mt-5">
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
      <SubGroupForm
        type="update"
        showContent={showEdit ? "" : "hidden"}
        handlChange={() => setshowEdit((prev) => !prev)}
        data={rows[selectedId]}  
        categories={rows}
      />
        <DeleteSubGroupModal
          handlChange={() => setshowDelete((prev) => !prev)}
          contentShow={showDelete}
          id={rows[selectedId]?.id}
        />
      </Table>

      <SubGroupForm
        type="add"
        showContent={showAddSubGroup ? "" : "hidden"}
        handlChange={handlChange}
        categories={rows}
      />
    </section>
  );
};

export default SubGroups;
