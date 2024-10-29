import React from 'react'
import Modal from '../../../components/generics/Modal'
import AddUnitsForm from '../forms/AddUnitsForm'

function AddUnits({ handlChange, showForm }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <AddUnitsForm type={"add"} />
    </Modal>
  )
}

export default AddUnits;