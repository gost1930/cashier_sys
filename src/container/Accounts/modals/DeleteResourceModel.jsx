import Modal from '../../../components/generics/Modal'
import DeleteForn from '../forms/DeleteForn'
import { deleteAccount } from '../../../utils/api/account'
import { showErrorAlert, showSuccessAlert } from '../../../utils/alert'

function DeleteResourceModel({ handlChange, showContent , id}) {

  const handleSubmit = () => {
    deleteAccount(id) 
      .then(() => {
        showSuccessAlert("تم حذف العنصر بنجاح")
        window.location.reload();
      })
      .catch((err) => {
        showErrorAlert(err.message);
        console.log(err)
      })
  }


  return (
     <Modal handlChange={handlChange} showContent={showContent?"":"hidden"}>
      <DeleteForn handleSubmit={handleSubmit} />
    </Modal>
  )
}

export default DeleteResourceModel