export const API_URL = "http://localhost:3001/api/v1";

export const LOGIN_URL = `${API_URL}/auth/sign-in`;
export const LOGOUT_URL = `${API_URL}/auth/sign-out`;

export const USERS_URL = `${API_URL}/auth/users`;
export const ADD_USERS_URL = `${API_URL}/auth/add-user`;
export const UPDATE_USERS_URL = `${API_URL}/auth/update-user`;
export const DELETE_USERS_URL = `${API_URL}/auth/delete-user`;

export const BUILDING_URL = `${API_URL}/building/`;

export const UNIT_URL = `${API_URL}/unit/`;

export const ACCOUNT_URL = `${API_URL}/account/`;

export const GROUP_URL = `${API_URL}/group/`;

export const DELEVERYCOMPANY_URL = `${API_URL}/deleveryCompany/`;
export const CATEGORY_URL = `${API_URL}/category/`;

export const TABLE_URL = `${API_URL}/table/`;

export const CASHIER_URL = `${API_URL}/cashier/`;

export const PERMISSIONS = [
  {
    items: {
      can_access_settings: "الإعدادات",
      can_access_devices: "الإفتراضية",
    },
  },
  { items: { can_close_cashier: "إغلاق الكاشير" } },

  {
    items: {
      can_add_person: " الحساب إضافة",
      can_edit_person: " الحساب تعديل",
      can_remove_person: " الحساب حذف",
    },
  },
  { items: { can_manage_users: "المستخدمين" } },
  {
    items: {
      can_add_company: " إضافة شركات التوصيل",
      can_edit_company: " شركات التوصيل تعديل",
      can_remove_company: "حذف  شركات التوصيل",
    },
  },
  { items: { can_manage_units: "الوحدات" } },
  {
    items: {
      can_manage_tables: "الطاولات",
      can_delete_TInvoice: "حذف فاتورة طاولة",
    },
  },
  {
    items: {
      can_manage_groups: "المجموعات",
      can_manage_dishes: "إدخال أطباق التحضير",
    },
  },
  {
    items: {
      can_add_category: "إضافة الأصناف",
      can_edit_category: "تعديل الأصناف",
      can_remove_category: "حذف الأصناف",
    },
  },
  {
    items: {
      can_manage_reports: "التقارير",
      can_print_report: "طباعة الفواتير فقط",
    },
  },
  { items: { can_manage_insurance: "التأمين" } },
  { items: { can_manage_purchases: "المشتريات" } },
  {
    items: {
      can_manage_sales: "المبيعات",
      can_manage_discounts: "خصم فاتورة",
      can_manage_returnsSales: "مرتجع مبيعات",
    },
  },
];
