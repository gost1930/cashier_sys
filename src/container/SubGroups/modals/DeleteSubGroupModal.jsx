import React from 'react'
import Modal from '../../../components/generics/Modal'
import Delete from '../../../components/generics/Delete'
import { deleteCategory } from '../../../utils/api/categories'
import { showSuccessAlert } from '../../../utils/alert'

function DeleteSubGroupModal({ contentShow, handlChange, id }) {
  const onDelete = () => {
    deleteCategory(id)
      .then(() => {
        showSuccessAlert('تم حذف الصنف بنجاح')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        showErrorAlert(err.message)
      })
  }

  return (
     <Modal handlChange={handlChange} showContent={contentShow?"":"hidden"}>
      <Delete titel="حذف هذا الصنف" handlDelete={onDelete}/>
    </Modal>
  )
}

export default DeleteSubGroupModal