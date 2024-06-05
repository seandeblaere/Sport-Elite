import { useEffect, useState } from "react";
import { useAuth } from "../components/Context/AuthContainer";

const useNavigation = () => {
  const { user } = useAuth();
  const [navigation, setNavigation] = useState<
    { label: string; link: string }[]
  >([]);

  useEffect(() => {
    const getNavigation = (): { label: string; link: string }[] => {
      if (!user) {
        return [
          { label: "Home", link: "/" },
          { label: "Products", link: "/products" },
          { label: "Login", link: "/login" },
        ];
      }

      const baseNavigation = [
        { label: "Home", link: "/" },
        { label: "Products", link: "/products" },
      ];

      if (user.admin || user.seller) {
        return [
          ...baseNavigation,
          { label: "Dashboard", link: "/dashboard" },
          { label: "Logout", link: "/logout" },
        ];
      }

      return [
        ...baseNavigation,
        { label: "Shopping cart", link: "/cart" },
        { label: "Profile", link: "/profile" },
        { label: "Logout", link: "/logout" },
      ];
    };

    setNavigation(getNavigation());
  }, [user]);

  return navigation;
};

export default useNavigation;
