import Modal from '../../../components/generics/Modal'
import DeleteDeleveryCompaneForm from '../forms/DeleteDeleveryCompaneForm'
import { deleteDeleveryCompany } from '../../../utils/api/deleveryCompany'
import { showErrorAlert, showSuccessAlert } from '../../../utils/alert'

function DeleteDeleveryCompane({ handlChange, showForm , id}) {

  const handleSubmit = () => {
    deleteDeleveryCompany(id)
      .then(() => {
        showSuccessAlert("تم حذف الشركة بنجاح")
        window.location.reload();
      })
      .catch((err) => {
        showErrorAlert(err.message);
        console.log(err)
      })
  }
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <DeleteDeleveryCompaneForm handleSubmit={handleSubmit} />
    </Modal>
  )
}

export default DeleteDeleveryCompane;