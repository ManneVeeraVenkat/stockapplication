import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../../Entity/LoginRespinse";
import { useNavigate } from "react-router";
import { LoginUser, RegisterUser } from "../../Utilis/HttpService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { CompanySearch } from "../../company";
import { CompanySearchByName } from "../../FinacialModelingAPI";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, userName: string, password: string) => void;
  loginUser: (userName: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  search: string;
  setSearch: (search: string) => void;
  searchResults: CompanySearch[];
  onSearchClick: (e: React.SyntheticEvent) => Promise<void>;
  hasSearched: boolean;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [search, setSearch] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isReady, SetIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    SetIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    userName: string,
    password: string
  ) => {
    await RegisterUser(email, userName, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.successResponse?.token || "");
          const userObj = {
            userName: res.successResponse?.userName || "",
            email: res.successResponse?.email || "",
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.successResponse?.token || "");
          setUser(userObj);
          toast.success("Login Succues");
          navigate("/search");
        }
      })
      .catch((error) => {
        toast.warning("server eroor", error);
      });
  };
  const loginUser = async (email: string, password: string) => {
    await LoginUser(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.successResponse?.token || "");
          const userObj = {
            userName: res.successResponse?.userName || "",
            email: res.successResponse?.email || "",
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.successResponse?.token || "");
          setUser(userObj);
          toast.success("Login Succues");
          navigate("/search");
        }
      })
      .catch((error) => {
        toast.warning("server eroor", error);
      });
  };
  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/");
  };
  const onSearchClick = async (e: React.SyntheticEvent) => {
    if (!search.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      navigate("/");
      return;
    }
    setHasSearched(true);
    try {
      const result = await CompanySearchByName(search);
      if (result?.data && Array.isArray(result.data)) {
        setSearchResults(result.data);
      } else {
        setSearchResults([]);
      }
    } catch {
      setSearchResults([]);
    }
    navigate("/search-result");
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        registerUser,
        user,
        token,
        search,
        setSearch,
        searchResults,
        onSearchClick,
        hasSearched,
        isLoggedIn,
        logout,
      }}
    >
      {isReady ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
