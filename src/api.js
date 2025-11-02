import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
<<<<<<< HEAD
console.log(api)
=======

>>>>>>> 5a2de49 (02 novembre)
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");
<<<<<<< HEAD

=======
    console.log(token)
>>>>>>> 5a2de49 (02 novembre)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

<<<<<<< HEAD
export default api;
=======
export default api;
>>>>>>> 5a2de49 (02 novembre)
