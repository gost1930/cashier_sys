import Modal from '../../../components/generics/Modal'
import AddDeleveryCompaneForm from '../forms/AddDeleveryCompaneForm';

function EditDeleveryCompane({ handlChange, showForm , data }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <AddDeleveryCompaneForm type={"update"} data={data} />
    </Modal>
  )
}

export default EditDeleveryCompane;