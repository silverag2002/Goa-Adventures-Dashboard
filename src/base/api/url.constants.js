export class URLConstants {}

URLConstants.BASE_URL = "http://localhost:4000";
// AUTH ROUTES

URLConstants.getCountries = () => `${URLConstants.BASE_URL}/v1/countries`;
URLConstants.getStates = (country) =>
  `${URLConstants.BASE_URL}/v1/states/${country}`;
URLConstants.getCities = (state) =>
  `${URLConstants.BASE_URL}/v1/cities/${state}`;
URLConstants.product = () => `${URLConstants.BASE_URL}/v1/products/`;
URLConstants.getAllRecentJobsList = () =>
  `http://localhost:4002/v1/users/company/jobs`;