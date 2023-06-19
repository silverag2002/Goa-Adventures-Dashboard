export class URLConstants {}

URLConstants.BASE_URL = "http://localhost:3000";
// AUTH ROUTES

URLConstants.getCountries = () => `${URLConstants.BASE_URL}/v1/countries`;
// URLConstants.getClientsUnderFillment = () =>
//   `${URLConstants.BASE_URL}/v1/client/getClientsUnderFillmentForAdmin`;
