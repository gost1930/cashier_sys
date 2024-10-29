import { TABLE_URL } from "../consts";

export const getTables = async () => {
  const response = await fetch(TABLE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const addTable = async (table) => {
  const token = localStorage.getItem("token");
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;
  const response = await fetch(TABLE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...table, building_id: +building_id }),
  });
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data = await response.json();
  return data;
};

export const updateTable = async (id, table) => {
  const token = localStorage.getItem("token");
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;
  const response = await fetch(`${TABLE_URL}/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...table, building_id: +building_id }),
  });
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data = await response.json();
  return data;
};

export const deleteTable = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${TABLE_URL}/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data = await response.json();
  return data;
};
