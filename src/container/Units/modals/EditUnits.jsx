import Modal from '../../../components/generics/Modal'
import AddUnitsForm from '../forms/AddUnitsForm';

function EditUnits({ handlChange, showForm , data }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <AddUnitsForm type={"update"} data={data} />
    </Modal>
  )
}

export default EditUnits;