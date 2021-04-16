import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();
const domain = process.env.REACT_APP_BACKEND_DOMAIN;

function UserContextProvider(props) {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const userRes = await axios.get(`${domain}/auth/loggedIn`);
    setUser(userRes.data);
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
