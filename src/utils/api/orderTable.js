import { TABLE_URL } from "../consts";

export const getTableRequest = async (id) => {
  const response = await fetch(`${TABLE_URL}${id}/requests`);
  const data = await response.json();
  return data;
};

export const deleteTableRequest = async (id) => {
  const response = await fetch(`${TABLE_URL}request/${id}`, {
    method: "DELETE",
  });
  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.reload();
  }
  const data = await response.json();
  return data;
};
