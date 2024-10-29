import { ACCOUNT_URL } from "../consts";

export const getDrivers = async () => {
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;
  const DRIVER_URL = `${ACCOUNT_URL}${building_id}/drivers/`;
  const response = await fetch(DRIVER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getClients = async () => {
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;
  const CLIENT_URL = `${ACCOUNT_URL}${building_id}/clients/`;
  const response = await fetch(CLIENT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
};
export const getAccounts = async () => {
  const response = await fetch(ACCOUNT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const createAccount = async (data) => {
  const token = localStorage.getItem("token");
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;
  const response = await fetch(ACCOUNT_URL, {
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
  }
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
};

export const updateAccount = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${ACCOUNT_URL}/${id}/`, {
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
  }
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
};

export const deleteAccount = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${ACCOUNT_URL}/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    const data = await response.json();
    return data;
  }
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
};
