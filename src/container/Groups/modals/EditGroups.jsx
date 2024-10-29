import React from 'react'
import Modal from '../../../components/generics/Modal'
import GroupsForm from '../forms/GroupsForm'

function EditGroups({ handlChange, showForm, data, printers }) {
  
  return (
        <Modal handlChange={handlChange} showContent={showForm ? "" : "hidden"}>
        <GroupsForm data={data} type={"update"} printers={printers} />
    </Modal>
  )
}

export default EditGroups