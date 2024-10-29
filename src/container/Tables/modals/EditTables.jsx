import Modal from '../../../components/generics/Modal'
import TablesForm from '../forms/TablesForm'

function EditTables({ handlChange, showForm, data }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <TablesForm type="update" data={data} />
    </Modal>
  )
}

export default EditTables;