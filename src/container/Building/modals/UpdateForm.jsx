import React from "react";
import BuildingForm from "../forms/BuildingForm";
import { updateBuilding } from "../../../utils/api/building";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";

function UpdateForm({ showForm, setShowForm, data }) {
  const onSubmit = (values, id) => {
    updateBuilding(id, values)
      .then(() => {
        showSuccessAlert("تم تعديل المنشأة بنجاح");
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
      {" "}
      <BuildingForm
        onSubmit={onSubmit}
        handlChange={setShowForm}
        type="update"
        data={data}
      />
    </div>
  );
}

export default UpdateForm;
