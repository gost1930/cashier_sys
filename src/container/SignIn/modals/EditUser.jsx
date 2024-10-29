import Modal from '../../../components/generics/Modal'
import UserForm from '../forms/UserForm';

function EditUser({ handlChange, showForm, fieldsValues }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm}>
        <UserForm type="update" fieldsValues={fieldsValues}  />
    </Modal>
  )
}
export default EditUser;