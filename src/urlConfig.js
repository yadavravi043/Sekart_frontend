export const api='http://localhost:8078/api'
const baseUrl = "http://localhost:8078";
export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/${fileName}`;
  };