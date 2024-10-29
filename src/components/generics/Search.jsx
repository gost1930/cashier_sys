

const Search = ({showSelect}) => {
    return (
  
      <div className='w-full grid grid-cols-2'>
          <input className={`w-full p-2  border-gray-500 focus:outline-none ${showSelect === true ? ' rounded-r-full border-r border-y' :'border rounded-full'}`} type="text" placeholder='بحث ...' />
          {
              showSelect && <select name="" id="" className='border border-y border-gray-300 rounded-l-full'>
                  <option value="">النوع</option>
                  <option value="">كل السلع</option>
                  <option value="">كل السلع</option>  
              </select>
          }
      </div>
    )
  }
  
  export default Search