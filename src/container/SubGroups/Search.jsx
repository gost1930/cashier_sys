import React from 'react'

const Search = () => {
  return (

    <div className='w-full grid grid-cols-2'>
        <input className='w-full p-2 border-r border-y border-gray-300 rounded-r-full focus:outline-none' type="text" placeholder='بحث ...' />
        <select name="" id="" className='border border-y border-gray-300 rounded-l-full'>
            <option value="">البحث بالمجموعات</option>
            <option value="">كل السلع</option>
            <option value="">كل السلع</option>
        </select>
    </div>
  )
}

export default Search
