import urljoin from "url-join";

export const baseUrl = "http://localhost:3001/";

export const baseUrlJoin = (...url_parts) => {
  return urljoin(baseUrl, ...url_parts);
};
