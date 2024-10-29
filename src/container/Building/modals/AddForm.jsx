import React from "react";
import BuildingForm from "../forms/BuildingForm";
import { createBuilding } from "../../../utils/api/building";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";

function AddForm({ showForm, setShowForm }) {
  const onSubmit = (values) => {
    createBuilding(values)
      .then(() => {
        showSuccessAlert("تم اضافة المنشأة بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((err) => {
        showErrorAlert(err.message);
      });
  };
  return (
    <div>
      <BuildingForm onSubmit={onSubmit} handlChange={setShowForm} type="add" />
    </div>
  );
}

export default AddForm;
