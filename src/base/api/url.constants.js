export class URLConstants {}

URLConstants.BASE_URL = "http://localhost:4000";

(URLConstants.BASE_URL = "http://backend.goaadventure.in:80"),
  // URLConstants.BASE_URL =
  //   "http://ec2-65-2-166-56.ap-south-1.compute.amazonaws.com:4000";
  // AUTH ROUTES

  (URLConstants.getCountries = () => `${URLConstants.BASE_URL}/v1/countries`);
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

//booking routes

URLConstants.modifyBookings = (bookingId) =>
  `${URLConstants.BASE_URL}/v1/booking/${bookingId}`;

//category routes

URLConstants.modifyCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/categories/${categoryId}`;
URLConstants.activateCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/categories/activate/${categoryId}`;
URLConstants.deactivateCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/categories/deactivate/${categoryId}`;

//subcategory routes
URLConstants.modifySubCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/subcategories/${categoryId}`;
URLConstants.activateSubCategory = (subCategoryId) =>
  `${URLConstants.BASE_URL}/v1/subcategories/activate/${subCategoryId}`;
URLConstants.deactivateSubCategory = (subCategoryId) =>
  `${URLConstants.BASE_URL}/v1/subcategories/deactivate/${subCategoryId}`;
URLConstants.getSubCategoryUnderCategory = (categoryId) =>
  `${URLConstants.BASE_URL}/v1/subcategories/getSubCategoryByCategory/${categoryId}`;

//customer routes

URLConstants.modifyCustomers = (customerId) =>
  `${URLConstants.BASE_URL}/v1/customer/${customerId}`;
URLConstants.disableCustomer = (customerId) =>
  `${URLConstants.BASE_URL}/v1/customer/deactivate/${customerId}`;

//staff routes

URLConstants.modifyStaff = (staffId) =>
  `${URLConstants.BASE_URL}/v1/staff/${staffId}`;
URLConstants.disableStaff = (staffId) =>
  `${URLConstants.BASE_URL}/v1/staff/deactivate/${staffId}`;

//prouduct routes

URLConstants.modifyProduct = (productId) =>
  `${URLConstants.BASE_URL}/v1/products/${productId}`;
URLConstants.disableProduct = (productId) =>
  `${URLConstants.BASE_URL}/v1/products/deactivate/${productId}`;
URLConstants.getProductUnderSubCategory = (subCategoryId) =>
  `${URLConstants.BASE_URL}/v1/products/getProductFromSubCategory/${subCategoryId}`;

//terms-routes
URLConstants.terms = () => `${URLConstants.BASE_URL}/v1/terms-conditions`;

//privacy-routes
URLConstants.privacy = () => `${URLConstants.BASE_URL}/v1/privacy-policies`;

//location routes
URLConstants.location = () => `${URLConstants.BASE_URL}/v1/location`;
URLConstants.getParentLocation = () =>
  `${URLConstants.BASE_URL}/v1/location/getHomePageDestination`;
URLConstants.getLocationFromParent = (locationName) =>
  `${URLConstants.BASE_URL}/v1/location/getLocationFromParent/${locationName}`;
URLConstants.updateLocation = (locationId) =>
  `${URLConstants.BASE_URL}/v1/location/${locationId}`;
