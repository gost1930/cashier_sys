import Modal from '../../../components/generics/Modal'
import DeleteUnitsForm from '../forms/DeleteUnitsForm'
import { deleteUnit } from '../../../utils/api/unit'
import { showErrorAlert, showSuccessAlert } from '../../../utils/alert'

function DeleteUnits({ handlChange, showForm , id}) {

  const handleSubmit = () => {
    deleteUnit(id)  
      .then(() => {
        showSuccessAlert("تم حذف الوحدة بنجاح")
        window.location.reload();
      })
      .catch((err) => {
        showErrorAlert(err.message);
        console.log(err)
      })
  }

  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <DeleteUnitsForm handleSubmit={handleSubmit} />
    </Modal>
  )
}

export default DeleteUnits;