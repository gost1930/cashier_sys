import React from 'react'
import Modal from '../../../components/generics/Modal'
import AddGroupsForm from '../forms/GroupsForm'

function AddGroups({ handlChange, showForm, printers }) {
  return (
       <Modal handlChange={handlChange} showContent={showForm }>
        <AddGroupsForm printers={printers} type={"add"} />
    </Modal>
  )
}

export default AddGroups