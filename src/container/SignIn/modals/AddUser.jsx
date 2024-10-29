import React from 'react'
import Modal from '../../../components/generics/Modal'
import UserForm from '../forms/UserForm';

function AddUser({ handlChange, showForm }) {
  return (
      <Modal handlChange={handlChange} showContent={showForm}>
        <UserForm type="add" />
    </Modal>
  )
}

export default AddUser;