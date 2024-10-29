import React from "react";
import AccountForm from "../forms/AccountForm";
import Modal from "../../../components/generics/Modal";
import ClientOrSupplierForm from "../forms/ClientOrSupplierForm";

function EditEmployeeModel({ handlChange, showContent, data, type }) {
  return (
    <Modal handlChange={handlChange} showContent={showContent ? "" : "hidden"}>
      {type === "سائق" ? (
        <AccountForm data={data} type={"update"} />
      ) :  (
        <ClientOrSupplierForm data={data} type={"update"} />
)}
    </Modal>
  );
}

export default EditEmployeeModel;
