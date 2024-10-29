import { IoAddCircleOutline } from "react-icons/io5";
import { getClients, getDrivers } from "../../../utils/api/account";
import { useEffect, useState } from "react";

const Search = ({ type, setSelected, handleChange }) => {
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (type === "client") {
      getClients()
        .then((res) => {
          setOptions(res);
          setFilteredOptions(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "driver") {
      getDrivers()
        .then((res) => {
          setOptions(res);
          setFilteredOptions(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [type]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filtered = options.filter((option) =>
      option.name_ar.startsWith(value)
    );
    setFilteredOptions(filtered);
  };

  const handleFocus = () => {
    setShowOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowOptions(false), 100);
  };

  const handleOptionClick = (id, name) => {
    setSelected(id);
    setSearchQuery(name);
    setShowOptions(false);
  };

  return (
    <div>
      <form className="w-full relative">
        <div className="flex">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="shadow appearance-none border rounded w-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
              placeholder={type === "client" ? "العميل" : "السائق"}
            />
            {showOptions && filteredOptions.length > 0 && (
              <div className="absolute top-10 left-0 w-full bg-white shadow-md z-10">
                {filteredOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionClick(option.id, option.name_ar)}
                    className="cursor-pointer py-1 px-3 hover:bg-gray-100 border-b"
                  >
                    {option.name_ar}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            type="submit"
            onClick={handleChange}
            className="cursor-pointer text-4xl"
          >
            <IoAddCircleOutline />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
