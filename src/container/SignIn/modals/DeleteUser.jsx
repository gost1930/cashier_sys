import Modal from '../../../components/generics/Modal'
import DeleteUserForm from '../forms/DeleteUserForm'

function DeleteUser({ handlChange, showForm, id }) {
  
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <DeleteUserForm id={id} />
    </Modal>
  )
}

export default DeleteUser;