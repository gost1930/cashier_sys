import { CASHIER_URL } from "../consts";

export const getCashierHistory = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(CASHIER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const onOpenCashier = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CASHIER_URL}/create`, {
    method: "POST",
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

export const onCloseCashier = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CASHIER_URL}close/${id}`, {
    method: "PUT",
    headers: {
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

export const getCashierHistoryById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CASHIER_URL}/${id}`, {
    method: "GET",
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
