import React from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { deleteBuilding } from '../../../utils/api/building';
import { showSuccessAlert } from '../../../utils/alert';
import Delete from '../../../components/generics/Delete';

const DeleteBuilding = ({ showDeleteForm, handlChange, id }) => {
  const handleSubmit = () => {
    deleteBuilding(id)
      .then(() => {
        showSuccessAlert("تم حذف المنشأة بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((err) => {
        console.log(err);
        showErrorAlert("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
      });
  }
  return (
    <div className={`${showDeleteForm} top-20 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-100 p-5 rounded-lg shadow-2xl w-2/3`}>
      <IoIosCloseCircleOutline
        onClick={handlChange}
        className="text-3xl absolute top-4 right-4 cursor-pointer"
      />
      <Delete titel="حذف المنشأة" handlDelete={handleSubmit} />
    </div>
  )
}

export default DeleteBuilding;
