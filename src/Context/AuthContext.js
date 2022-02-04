import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/Firebase";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    // Get current user's data and id from the InternsProfile when the app loads
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("InternsProfile")
          .where("UserId", "==", `${user.uid}`)
          .get()
          .then((res) => {
            let newId = "";
            res.forEach((doc) => {
              newId = doc.id;
              setUser({
                userDocId: newId,
                userData: doc.data(),
              });
              setIsAuthenticated(true);
            });
          });
      } else {
        setUser(null);
      }
    });
  }, [isAuthenticated]);
  console.log({ user, isAuthenticated });

  // Logout logic
  const logout = () => {
    //While signout() function runs, loading is set to true
    setIsLoading(true);
    auth
      .signOut()
      .then(() => {
        console.log("Logout Successful");
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.log(error);
      });

    //Set loading to false once function is performed
    setIsLoading(false);
  };

  //Login with email and password logic
  const login = (email, password) => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setIsLoading(false);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
