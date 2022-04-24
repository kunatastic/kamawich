import React, { useEffect } from "react";
import { UserType } from "../types/UserType";
import { me } from "../utils/ApiUtils";

export const UserLoginContext = React.createContext<{
  user: UserType | null;
  setUser: () => void;
  loggedIn: boolean;
}>({
  user: null,
  setUser: async () => {
    await me();
  },
  loggedIn: false,
});

function UserLogin(props: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserType | null>(null);

  async function getCurrentUser() {
    const currentUser = await me();
    setUser(currentUser);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <UserLoginContext.Provider
        value={{
          user: user,
          setUser: getCurrentUser,
          loggedIn: user !== null && user.username !== "",
        }}
      >
        {props.children}
      </UserLoginContext.Provider>
    </>
  );
}

export default UserLogin;
