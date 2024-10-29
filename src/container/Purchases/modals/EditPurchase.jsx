import React from 'react'
import Modal from '../../../components/generics/Modal'
import Forms from '../forms/Forms'

function EditPurchase({ handlChange, showForm }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <Forms type="update" />
    </Modal>
  )
}

export default EditPurchase