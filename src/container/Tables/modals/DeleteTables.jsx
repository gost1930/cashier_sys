import Modal from '../../../components/generics/Modal'
import DeleteTablesForm from '../forms/DeleteTablesForm'

function DeleteTables({ handlChange, showForm, id }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <DeleteTablesForm id={id} />
    </Modal>
  )
}

export default DeleteTables;