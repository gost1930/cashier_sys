import React from 'react'
import Modal from '../../../components/generics/Modal'
import Delete  from '../../../components/generics/Delete'

function DeletePurchase({ handlChange, showForm }) {
  return (
     <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <Delete titel="حذف الفاتورة"/>
    </Modal>
  )
}

export default DeletePurchase