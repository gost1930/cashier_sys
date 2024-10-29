import { CATEGORY_URL } from "../consts";

export const getCategoriesByGroup = async (groupId) => {
  const response = await fetch(`${CATEGORY_URL}${groupId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const getInsuranceCategories = async () => {
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;
  const response = await fetch(`${CATEGORY_URL}insurance/${building_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getCategories = async () => {
  const response = await fetch(CATEGORY_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const createCategory = async (data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(CATEGORY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data2 = await response.json();
  return data2;
};

export const updateCategory = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CATEGORY_URL}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data2 = await response.json();
  return data2;
};

export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CATEGORY_URL}/${id}/`, {
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

export const importXlsxCategories = async (formData) => {
  const token = localStorage.getItem("token");
  const building_id = JSON.parse(localStorage.getItem("user")).building_id;

  const response = await fetch(`${CATEGORY_URL}import/${building_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    // طباعة الخطأ لتحليل المشكلة
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(
      "خطأ في الطلب، يرجى التحقق من الرابط أو المعالج في السيرفر."
    );
  }
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data2 = await response.json();
  return data2;
};
