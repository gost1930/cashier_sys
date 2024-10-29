import React from 'react'
import Modal from '../../../components/generics/Modal'
import AddDeleveryCompaneForm from '../forms/AddDeleveryCompaneForm'

function AddDeleveryCompane({ handlChange, showForm }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <AddDeleveryCompaneForm type={"add"} />
    </Modal>
  )
}

export default AddDeleveryCompane;