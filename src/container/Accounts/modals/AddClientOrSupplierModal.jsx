import React from "react";
import Modal from "../../../components/generics/Modal";
import AddClientOrSupplierForm from "../forms/ClientOrSupplierForm";

function AddClientOrSupplierModal({ handlChange, showForm }) {
  return (
    <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <AddClientOrSupplierForm type={"add"}  />
    </Modal>
  );
}

export default AddClientOrSupplierModal;
