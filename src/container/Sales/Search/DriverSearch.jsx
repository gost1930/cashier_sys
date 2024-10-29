import Search from './Search'

const DriverSearch = ({handleChange , setSelected}) => {
  return (
    <div>
      <Search type="driver" setSelected={setSelected} handleChange={handleChange} />
    </div>
  )
}

export default DriverSearch
