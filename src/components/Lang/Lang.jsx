import React from 'react'

const Lang = () => {
  return (
    <div>
      <form action="">
        <div className='flex flex-row items-center justify-center'>
        <label htmlFor="">اللغة</label>
        <select className='block appearance-none w-1/2 bg-gray-50 border border-gray-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mx-2' name="" id="">
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
        </div>
      </form>
    </div>
  )
}

export default Lang
