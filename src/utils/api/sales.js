import { API_URL } from "../consts";

export const createSales = async (data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/sales`, {
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

export const updateSales = async (invoiceId, tableId, data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/sales/${invoiceId}/${tableId}`, {
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

export const switchTable = async (invoiceId, tableId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/sales/switch/${invoiceId}/${tableId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data2 = await response.json();
  return data2;
};

export const getInsuranceInvoice = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/sales/hase/insurance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getInsuranceInvoiceById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/sales/hase/insurance/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const updateInvoiceInsurance = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/sales/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      insurance: true,
    }),
  });
  if (res.status === 401 || res.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data = await res.json();
  return data;
};

export const onPayDeliveredOrder = async (data, invoiceId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/sales/delivery/pay/${invoiceId}`, {
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
    const data1 = await response.json();
    return data1;
  } catch (error) {
    console.error(error);
  }
};

export const getDeliveredOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/sales/delivery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDriver = async (id, driver_id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${API_URL}/sales/delivery/driver/${id}/${driver_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status === 401 || res.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data = await res.json();
  return data;
};
