import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// Api Function
const api = axios.create({
  baseURL: "http://localhost:5000",
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const navigate = useNavigate();
      navigate("/auth-login");
      return Promise.reject(new Error("Token is not available"));
    }
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized - Token is not valid
        toast.error("Unauthorized. Please login again.", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        console.error("Unauthorized: Token is not valid");
      } else if (status === 404) {
        // Not Found
        toast.error("Not Found.", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        console.error("Not Found");
      } else if (status === 422) {
        // Validation Error
        toast.warning("Validation Failed. Some Fields are required", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      } else {
        // Other error
        toast.error("Internal Error", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        console.error("An error occurred:", error);
      }
    } else if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      // Timeout error
      toast.info("Timeout", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      console.error("Request timeout occurred:", error);
    } else if (error.request) {
      // Network error
      toast.info("Network, Please Check Internet Connection", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      console.error("A network error occurred:", error.request);
    } else {
      // Something else happened
      toast.info("Something else Error", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      console.error("An error occurred:", error.message);
    }

    return Promise.reject(error); // Propagate the error further if needed
  }
);

//Use Api Hook

const useApiHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const useApi = axios.create({
    baseURL: "http://localhost:5000/",
  });

  useApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
        setIsLoading(true);
        return config;
      } else {
        // Redirect to login page
        navigate("/auth-login");
        return Promise.reject("Token is not available");
      }
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  useApi.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      setData(response.data);
      return response.data;
    },
    (error) => {
      setIsLoading(false);
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          // Unauthorized - Token is not valid
          toast.error("Unauthorized. Please login again.", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
          });
        } else if (status === 404) {
          // Not Found
          toast.error("Not Found.", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
          });
        } else if (status === 422) {
          // Validation Error
          toast.warning("Validation Failed. Some Field is required", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
          });
        } else {
          // Other error
          toast.error("Internal Error", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
          });
        }
      } else if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
        // Timeout error
        toast.info("Timeout", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      } else if (error.request) {
        // Network error
        toast.info("Network, Please Check Internet Connection", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      } else {
        // Something else happened
        toast.info("Something else Error", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      }

      setError(error);
      return Promise.reject(error);
    }
  );

  return  {useApi, isLoading, data, error} ;
};

// const useApiHook = (baseURL) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   const useApi = axios.create({
//     baseURL: baseURL || "http://localhost:5000/",
//   });

//   useEffect(() => {
//     let isMounted = true; // To track if the component is still mounted

//     useApi.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//           config.headers.Authorization = token;
//           setIsLoading(true);
//           return config;
//         } else {
//           // Redirect to login page
//           navigate("/auth-login");
//           return Promise.reject("Token is not available");
//         }
//       },
//       (error) => {
//         setIsLoading(false);
//         return Promise.reject(error);
//       }
//     );

//     useApi.interceptors.response.use(
//       (response) => {
//         setIsLoading(false);
//         if (isMounted) {
//           setData(response.data);
//         }
//         return response.data;
//       },
//       (error) => {
//         setIsLoading(false);
//         if (isMounted) {
//           handleErrorResponse(error);
//         }
//         setError(error);
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       isMounted = false; // Clean up to prevent state updates on unmounted components
//     };
//   }, [useApi, navigate]);

//   const handleErrorResponse = (error) => {
//     // Handle different error responses
//     // ...

//     // For example:
//     if (error.response) {
//       const status = error.response.status;
//       if (status === 401) {
//         toast.error("Unauthorized. Please login again.", {
//           // Toast notification options
//         });
//       } else if (status === 404) {
//         toast.error("Not Found.", {
//           // Toast notification options
//         });
//       } else if (status === 422) {
//         toast.warning("Validation Failed. Some Field is required", {
//           // Toast notification options
//         });
//       } else {
//         toast.error("Internal Error", {
//           // Toast notification options
//         });
//       }
//     } else if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
//       toast.info("Timeout", {
//         // Toast notification options
//       });
//     } else if (error.request) {
//       toast.info("Network, Please Check Internet Connection", {
//         // Toast notification options
//       });
//     } else {
//       toast.info("Something else Error", {
//         // Toast notification options
//       });
//     }
//   };

//   return { useApi, isLoading, data, error };
// };
export { useApiHook };
export default api;
