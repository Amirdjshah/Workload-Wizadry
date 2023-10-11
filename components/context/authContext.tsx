import React, { useEffect, useState } from "react";
import { fetchProfile, logoutUser } from "../../lib";
import { IAccessToken, ICompany } from "../../interfaces/dataInterface";
import { useRouter } from "next/router";

interface IAuthContextProps {
  user: any;
  setLoading: (v: boolean) => void;
  setAccessToken: (v: IAccessToken) => void;
  company?: ICompany;
  setUser: (u: any) => void;
  isLoading: boolean;
  accessToken?: IAccessToken;
  handleLogout: () => void;
  currency: string;
  setSearchState: (boo: boolean) => void;
  searchState: boolean;
  role?: "employee" | "admin";
  fetchUser: (id: number, token: string) => void;
}
const AuthContext = React.createContext<IAuthContextProps>({
  user: undefined,
  company: undefined,
  setLoading: (v: boolean) => {},
  setAccessToken: (v: IAccessToken) => {},
  setUser: (v: any) => {},
  isLoading: false,
  handleLogout: () => {},
  currency: "",
  accessToken: undefined,
  role: undefined,
  setSearchState: (boo: boolean) => {},
  searchState: false,
  fetchUser: (id: number, token: string) => {},
});

interface IProps {
  children: React.ReactNode;
}
const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<ICompany>();
  const [partner, setPartner] = useState(null);
  const [accessToken, setAccessToken] = useState<IAccessToken>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  // TODO: make its own context
  const [productSearchState, setProductSearchState] = useState(false);

  const [currency, setCurrency] = useState("SAR");
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
    } catch (err) {
    } finally {
      router.push("/login");
    }
  };
  const handleFetchUserInfo = (id: number, token: string) => {
    // fetchProfile(id, token).then((res: any) => {
    //   setUser(res.data?.data?.user);
    //   setCompany(res.data?.data?.company);
    //   setPartner(res.data?.data?.partner);
    // });
  };
  
  //   useEffect(() => {
  //     setLoading(true);
  //     const lsAccessTokenString = localStorage.getItem("access_token");
  //     if (lsAccessTokenString && !accessToken) {
  //       const lsAccessToken = JSON.parse(lsAccessTokenString) as IAccessToken;
  //       setAccessToken(lsAccessToken);
  //     } else if (!lsAccessTokenString && accessToken) {
  //       localStorage.setItem("access_token", JSON.stringify(lsAccessTokenString));
  //     }
  //     if (lsAccessTokenString && accessToken) {
  //       handleFetchUserInfo(accessToken.uid, accessToken.access_token);
  //     }
  //     setLoading(false);
  //   }, [accessToken]);

  useEffect(() => {
    if (router.pathname.includes("forget-password")) return;
    if (user && !isLoading && router.pathname.includes("/login")) {
      router.push("/");
    }
    // if (user === null && !isLoading) {
    //   router.push("/login");
    // }
  }, [user, router.pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setLoading,
        setUser,
        setAccessToken,
        handleLogout,
        role: user?.partner_id?.role,
        company: company,
        accessToken: accessToken,
        currency: currency,
        setSearchState: setProductSearchState,
        searchState: productSearchState,
        fetchUser: handleFetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
