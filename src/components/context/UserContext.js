import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const checkToken = async () => {
        const token = localStorage.getItem("loginToken");
  
        if (token) {
          try {
            const response = await axios.get("http://localhost:3001/api/user/info", {
              params: { token: token },
            });
  
            if (response.data.user) {
              setUser(response.data.user);
            } else {
                localStorage.removeItem("loginToken");
                setUser(null);
            }
          } catch (error) {
            console.error(error);
            localStorage.removeItem("loginToken");
            setUser(null);
          }
        }
      };
  
      checkToken();
}, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
