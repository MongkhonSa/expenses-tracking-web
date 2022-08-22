import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WithAuth = (Component: NextComponentType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("token");
      if (!isAuthenticated) {
        router.push("/login");
      }
    });

    return <Component />; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};
export default WithAuth;
