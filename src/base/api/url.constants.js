export class URLConstants {}

URLConstants.BASE_URL = "http://localhost:4000";
// AUTH ROUTES

URLConstants.getCountries = () => `${URLConstants.BASE_URL}/v1/countries`;
URLConstants.getStates = (country) =>
  `${URLConstants.BASE_URL}/v1/states/${country}`;
URLConstants.getCities = (state) =>
  `${URLConstants.BASE_URL}/v1/cities/${state}`;
URLConstants.product = () => `${URLConstants.BASE_URL}/v1/products/`;
URLConstants.categories = () => `${URLConstants.BASE_URL}/v1/categories/`;
URLConstants.subcategories = () => `${URLConstants.BASE_URL}/v1/subcategories/`;
URLConstants.customers = () => `${URLConstants.BASE_URL}/v1/customer/`;
URLConstants.bookings = () => `${URLConstants.BASE_URL}/v1/booking/`;
URLConstants.staff = () => `${URLConstants.BASE_URL}/v1/staff/`;

URLConstants.modifyBookings = (bookingId) =>
  `${URLConstants.BASE_URL}/v1/booking/${bookingId}`;
URLConstants.modifyCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/categories/${categoryId}`;
URLConstants.activateCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/categories/activate/${categoryId}`;
URLConstants.deactivateCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/categories/deactivate/${categoryId}`;
URLConstants.modifySubCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/subcategories/${categoryId}`;
URLConstants.activateSubCategory = (subCategoryId) =>
  `${URLConstants.BASE_URL}/v1/subcategories/activate/${subCategoryId}`;
URLConstants.deactivateSubCategory = (subCategoryId) =>
  `${URLConstants.BASE_URL}/v1/subcategories/deactivate/${subCategoryId}`;
