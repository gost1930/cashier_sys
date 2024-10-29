import { DELEVERYCOMPANY_URL } from "../consts";

export const getDeleveryCompanies = async () => {
  const response = await fetch(DELEVERYCOMPANY_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const createDeleveryCompany = async (data) => {
  const token = localStorage.getItem("token");
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;
  const response = await fetch(DELEVERYCOMPANY_URL, {
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

export const updateDeleveryCompany = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${DELEVERYCOMPANY_URL}/${id}/`, {
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

export const deleteDeleveryCompany = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${DELEVERYCOMPANY_URL}/${id}/`, {
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
