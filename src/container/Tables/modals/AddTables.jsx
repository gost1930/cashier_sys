import React from 'react'
import Modal from '../../../components/generics/Modal'
import TablesForm from '../forms/TablesForm'

function AddTables({ handlChange, showForm }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <TablesForm type="add" />
    </Modal>
  )
}

export default AddTables;