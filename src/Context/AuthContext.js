import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase/Firebase";
import { SnackbarContext } from "./SnackbarContext";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { callSnackbar } = useContext(SnackbarContext);
  useEffect(() => {
    // Get current user's data and id from the InternsProfile when the app loads
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);

        // Check if its a new applicant
        db.collection("InternsProfile")
          .where("UserId", "==", `${user.uid}`)
          .get()
          .then((res) => {
            let newId = "";
            // Means the intern is a new applicant
            if (res.docs.length === 1) {
              res.docs.forEach((doc) => {
                newId = doc.id;
                setUser({
                  userDocId: newId,
                  userData: doc.data(),
                });
                setIsAuthenticated(true);
              });
              return new Promise((resolve, reject) => {
                resolve("New Intern");
              });
            }

            // Check if the intern is a selected candidate
            return db
              .collection("SelectedCandidates")
              .where("userId", "==", user.uid)
              .get();
          })
          .then((res) => {
            if (res === "New Intern") return;

            res.docs.forEach((doc) => {
              setUser({
                userDocId: doc.id,
                userData: doc.data(),
              });
            });
          })
          .catch((err) => console.log(err));
      } else {
        setUser(null);
      }
    });
  }, [isAuthenticated]);

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
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Sign Up Function for selected applicants
  const selectedCandidateSignup = (resoluteEmail, personalEmail, password) => {
    setIsLoading(true);

    //  Check if the Intern's personal email is inside the SelectedCandidates
    // collection

    db.collection("SelectedCandidates")
      .where("candidateDetails.basicDetails.email", "==", personalEmail)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          callSnackbar(
            true,
            "You are not a selected applicant, please sign up as a new candidate",
            "error"
          );
          return;
        }
        let selectedCandidateDocRef;
        querySnapshot.forEach((doc) => {
          selectedCandidateDocRef = db
            .collection("SelectedCandidates")
            .doc(doc.id);
        });

        auth
          .createUserWithEmailAndPassword(resoluteEmail, password)
          .then((userCredentials) => {
            selectedCandidateDocRef.update({
              "candidateDetails.profileComplete": false,
              userId: userCredentials.user.uid,
            });
            setIsLoading(false);
            setIsAuthenticated(true);
          })
          .catch((err) => {
            if (
              err.message ===
              "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
            )
              callSnackbar(
                true,
                "Account with the same email exists already, please try again later",
                "error"
              );
            console.log(err.message);
          });
        console.log(querySnapshot);
      })
      .catch((err) => {
        callSnackbar(true, "An Error Occured Please try again later", "error");
        console.log(err);
      });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        selectedCandidateSignup,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
