import React from 'react'
import Modal from '../../../components/generics/Modal'
import Forms from '../forms/Forms'

function AddPurchase({ handlChange, showForm }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <Forms />
    </Modal>
  )
}

export default AddPurchase