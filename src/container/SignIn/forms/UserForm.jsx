import { useEffect, useState } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import { PERMISSIONS } from "../../../utils/consts";
import { addUser, updateUser } from "../../../utils/api/auth";
import { showErrorAlert, showSuccessAlert } from "../../../utils/alert";

const PermissionGroup = (props) => (
  <div id="other_permissions" className="p-1 m-1 duration-300 rounded-lg hover:shadow-xl">
    {Object.keys(props.permissions).map((k, index) => (
      <div key={index}>
        <label>{props.permissions[k]}</label>
        <input
          type="checkbox"
          name={k}
        />
      </div>
    ))}
  </div>
);

const UserForm = ({ type, fieldsValues }) => {
  const [permission, setPermission] = useState({})
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, seterrors] = useState({
    username: "",
    password: "",
  });

  const buildingID = JSON.parse(localStorage.getItem("user")).building_id;
  const is_super_user_auth = JSON.parse(localStorage.getItem("user")).is_super_user;
  const [is_super_user, setIs_super_user] = useState(false)
  const checkbox_permission_id =
    type === "update"
      ? `permission_${type}_${fieldsValues?.id}`
      : `permission_${type}_0`; 

  useEffect(() => {
    if (fieldsValues && type === "update") {
      let p =  fieldsValues?.permission || {};
      const checkboxes = document.querySelectorAll(
        `#${checkbox_permission_id} #other_permissions input[type="checkbox"]`
      );

      checkboxes.forEach((checkbox) => {
          checkbox.checked = p[checkbox.name];
      });

      if (fieldsValues.is_super_user === true) {
        onEnablePermission(false);
      }
      else {
        onEnablePermission(true);
      }

      setPermission(p)
      setIs_super_user(fieldsValues.is_super_user)
      setUsername(fieldsValues.username)
      setPassword(fieldsValues.password)
     } 
  }, [fieldsValues?.id])
  

  const handlePermissins = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.name !== "is_super_user") {
        checkbox.checked = !checkbox.checked;
        setPermission({
          ...permission,
          [checkbox.name]: checkbox.checked,
        });
      } else {
        checkbox.checked = false;
        checkbox.disabled = !checkbox.disabled;
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username) {
      seterrors({
        ...errors,
        username: "الرجاء تعبئة اسم المستخدم",
      });
      return;
    }

    if (!password) {
      seterrors({
        ...errors,
        password: "الرجاء تعبئة كلمة المرور",
      })
      return;
    }

    const checkboxes = document.querySelectorAll(
      `#${checkbox_permission_id} input[type="checkbox"]`
    );
    let p = {};
    checkboxes.forEach((checkbox) => {
      p[checkbox.name] = checkbox.checked;
    });

    const data = {
      username,
      password,
      is_super_user: p.is_super_user,
      building_id: buildingID,
    };
    delete p.is_super_user
    data.permission = p;
    
    if (type === "add") {
      addUser(data)
        .then(() => {
          showSuccessAlert("تمت العملية بنجاح");
          setTimeout(() => {
            window.location.reload();
          }, 200);
        })
        .catch((err) => {
          showErrorAlert(err.message);
          console.log(err);
        });
    }
    else {
      delete data.permission.id
       updateUser(fieldsValues.id, data)
        .then(() => {
          showSuccessAlert("تمت العملية بنجاح");
          setTimeout(() => {
            window.location.reload();
          }, 200);
        })
        .catch((err) => {
          showErrorAlert(err.message);
          console.log(err);
        });
    }
  };

  const handleSuperUser = (e) => {
    if (e.target.checked) {
      onEnablePermission(false)
    }
    else {
      onEnablePermission(true)
    }
    setIs_super_user(!is_super_user)
  }

  const onEnablePermission = (value) => {
      const checkboxes = document.querySelectorAll(
        `#${checkbox_permission_id} #other_permissions input[type="checkbox"]`
      );

      checkboxes.forEach((checkbox) => {
        checkbox.disabled = !value;
        if (value == false) {
          checkbox.checked = false;
        }
      });
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-3 mb-8">
        {type === "add" ? "اضافة مستخدم" : "تعديل مستخدم"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 w-full">
          <div>
            <label className="block text-lg font-medium mb-2">
              إسم المستخدم
            </label>
            <input
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              كلمة المرور
            </label>
            <input
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
        </div>

        <div
          id={checkbox_permission_id}
          className="grid grid-cols-4 mt-2 divide-black"
        >
         {is_super_user_auth  && (
          <div className="flex my-3 gap-x-2 items-center align-middle">
            <input
              type="checkbox"
              onChange={handleSuperUser}
              name="is_super_user"
              className="mt-1"
              checked={is_super_user}
            />
            <label htmlFor="building">تحديد كمستخدم مشرف</label>
          </div>
        )}
          {PERMISSIONS.map((group, index) => (
            <PermissionGroup key={index} permissions={group.items} />
          ))}
        </div>

        <div className="flex mt-1 gap-x-2">
          <button className="py-2 px-7 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1">
            حفظ <RiAddBoxLine className="text-white" />
          </button>
          <div
            onClick={handlePermissins}
            className="p-2 bg-green-600 rounded-lg hover:bg-green-800 text-white flex items-center gap-1"
          >
            كل الصلاحيات
          </div>
        </div>
      </form>
    </section>
  );
};

export default UserForm;
