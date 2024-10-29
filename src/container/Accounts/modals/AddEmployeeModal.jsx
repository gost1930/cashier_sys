import React from "react";
import Modal from "../../../components/generics/Modal";
import AccountForm from "../forms/AccountForm";

function AddEmployeeModal({ handlChange, showForm }) {
  return (
    <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <AccountForm type={"add"}  />
    </Modal>
  );
}

export default AddEmployeeModal;
