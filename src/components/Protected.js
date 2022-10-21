import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Protected({ children, token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            setToken(null);
            navigate("/");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  if (!token) {
    alert("Silahkan Login/Register dahulu");
    return <Navigate to={`/`} />;
  }

  return children;
}

export default Protected;