import { showSuccessAlert } from "../../../utils/alert";
import { deleteTable } from "../../../utils/api/tables";


const DeleteTablesForm = ({ id }) => {
  const onDelete = () => {
    deleteTable(id)
      .then(() => {
        showSuccessAlert("تم حذف الوحدة بنجاح");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='grid grid-cols-1 w-full text-center'>
        <h1>هل أنت متاكد من حذف  الطاولة؟</h1>
        <div className="flex flex-row justify-center items-center w-full">
        <button type='submit' onClick={onDelete} className='text-white p-2 m-2 bg-green-500 rounded-lg hover:bg-green-600 w-fit'>تأكيد</button>
        </div>
      </div>
  )
}

export default DeleteTablesForm;
