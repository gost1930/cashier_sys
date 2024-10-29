import {
  LOGIN_URL,
  LOGOUT_URL,
  USERS_URL,
  ADD_USERS_URL,
  DELETE_USERS_URL,
  UPDATE_USERS_URL,
} from "../consts";

export const getUsers = async (id, page) => {
  const API_ENDPOINT = id
    ? `${USERS_URL}/${id}/${page}`
    : `${USERS_URL}/${page}`;
  const headers =
    page === "ADD_USER"
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      : { "Content-Type": "application/json" };

  const response = await fetch(API_ENDPOINT, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  return data;
};

export const login = async (username, password, building_id) => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      building_id,
    }),
  });
  const data = await response.json();

  if (response.status === 401) {
    throw new Error(data.message);
  } else if (response.status === 500) {
    throw new Error("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
  } else {
    return data;
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  const AuthorizationHeader = `Bearer ${token}`;
  const response = await fetch(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AuthorizationHeader,
    },
  });
  const data = await response.json();
  return data;
};

export const addUser = async (data) => {
  const token = localStorage.getItem("token");
  const building_id =
    data.building_id || JSON.parse(localStorage.getItem("user")).building_id;

  const response = await fetch(ADD_USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, building_id: +building_id }),
  });

  if (response.status === 201) {
    const data = await response.json();
    return data;
  } else if (response.status === 400) {
    throw new Error("خطأ في المدخلات");
  } else if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  } else {
    throw new Error("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
  }
};

export const updateUser = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${UPDATE_USERS_URL}/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else if (response.status === 400) {
    throw new Error("خطأ في المدخلات");
  } else if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  } else if (response.status === 404) {
    throw new Error("المستخدم غير موجود");
  } else {
    throw new Error("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
  }
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${DELETE_USERS_URL}/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return true;
  } else if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  } else {
    throw new Error("حدث خطأ ما ، الرجاء المحاولة مرة اخرى");
  }
};
