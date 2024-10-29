import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";
import { deleteUser } from "../../../utils/api/auth";

const DeleteUserForm = ({id}) => {
  
  const handleSubmit = () => {
    deleteUser(id)
      .then(() => {
        showSuccessAlert("تم حذف المستخدم بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        showErrorAlert(err.message);
      });
  }
  return (
    <div className='grid grid-cols-1 w-full text-center'>
        <h1>هل أنت متاكد من حذف المستخدم؟</h1>
        <div className="flex flex-row justify-center items-center w-full">
        <button onClick={handleSubmit} type='button' className='text-white p-2 m-2 bg-green-500 rounded-lg hover:bg-green-600 w-fit'>تأكيد</button>
        <button type='reset' className='text-white p-2 m-2 bg-red-500 rounded-lg hover:bg-red-600 w-fit'>إلغاء</button>
        </div>
      </div>
  )
}

export default DeleteUserForm;
