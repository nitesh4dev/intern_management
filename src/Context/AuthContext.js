import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase/Firebase";
import { SnackbarContext } from "./SnackbarContext";
export const AuthContext = createContext();

// AuthProvider, passes down states that needs to be access in multiple parts of the // component tree, such as user: object, isAuthenticated: boolean, isLoading: boolean
export default function AuthProvider({ children }) {
  // Loggedin user state, null by default
  const [user, setUser] = useState(null);

  // set the authentication state to false, by default.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { callSnackbar } = useContext(SnackbarContext);
  const history = useHistory();

  /* This will run on the initial render and whenever isAuthenticated is changed: similar to a combination of componentDidMount() and componentDidUpdate()*/

  useEffect(() => {
    /* The below function acts like an event listener, it gets triggered whenever
    the app gets rendered, or the user in auth changes on events like signup, login, logout etc or 
    Link to documentation on auth.onAuthStateChanged(): https://firebase.google.com/docs/auth/web/manage-users
    */

    auth.onAuthStateChanged((user) => {
      /* As mentioned in the previous comment paragraph, the function will get trigged whenever the app starts, even if we are in logged out state, therefore we have added a guard clause to set user state from the database only when firebase authenticated user is present and is not null or undefined.*/
      if (user) {
        console.log(user);

        /* If the firebase user exists, we check whether it belongs to InternsProfile collection, or SelectedCandidates collection and based on that we add the data to the user state and assign the type also.*/
        db.collection("InternsProfile")
          .where("UserId", "==", `${user.uid}`)
          .get()
          .then((res) => {
            let newId = "";

            /* If firebase returns a non empty collection, it means that the document related to the user data exists and is a new intern, we check for length being equal to 1 as a guard clause to ensure only one doc is present*/
            if (res.docs.length === 1) {
              res.docs.forEach((doc) => {
                newId = doc.id;

                /* Setting user data and assigning type to new-intern*/
                setUser({
                  userType: "new-intern",
                  userDocId: newId,
                  userData: doc.data(),
                });
                setIsAuthenticated(true);
              });

              /* We return a promise with no delay for easier chaining with then(), the promise returns New Intern*/
              return new Promise((resolve, reject) => {
                resolve("New Intern");
              });
            }

            /* If the length doesn't equal 1 which most certainly means it equals 0, if in future any problem arises regarding this, the next return statement can be wrapped inside elseif(res.docs.length === 0).
            
            The returns statements, fetches data from SelectedCandidates collection where the userId equals the firebase user.uid, the get() method returns a promise that is handled in the next then() method.
            
            Learn more about reading data at: 
            https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
            */
            return db
              .collection("SelectedCandidates")
              .where("userId", "==", user.uid)
              .get();
          })
          .then((res) => {
            /* If the data equals New Intern, we return from here.*/
            if (res === "New Intern") return;

            /* If the code reaches this part, we assume that the user belongs to SelectedCandidate collection, and since res.docs is of type array we loop through the array containing only one object*/

            res.docs.forEach((doc) => {
              /* doc.id is the id of the document in the firebase, you can use 
              db.collection('SelectedCandidates').doc(doc.id), to get the object directly also. */
              setUser({
                userType: "selected-intern",
                userDocId: doc.id,
                userData: doc.data(),
              });
            });
          })
          .catch((err) => console.log(err));
      } else {
        /* If the onAuthStateChanged returns the callback with no user, we set the user state to null. */
        setUser(null);
      }
    });
  }, [isAuthenticated]);

  /* Logout function: the following function logs the user out, by using auth.signOut() function which such sets the firebase auth state to null.*/
  const logout = () => {
    //While signout() method runs, loading is set to true
    setIsLoading(true);
    auth
      .signOut()
      .then(() => {
        console.log("Logout Successful");

        // After signOut(), set the authentication state to false, which will trigger onAuthStateChanged(), where the user parameter from the callback would be null, and user react state will get set to null.
        setIsAuthenticated(false);

        //Set loading to false once function is performed
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* Login functionality: the login function takes email and password as argument, and signs in to firebase using the method from firebase SDK,*/
  const login = (email, password) => {
    //While signInWithEmailPassword() method runs, loading is set to true
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Login successful");
        setIsLoading(false);

        /* If the login was successful, authentication state is changed to true, which will again trigger the onAuthStateChanged method, but this time the user will not be null, thus we get the user's uid and check it against our firestore database .*/
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  /* Signup functionality for selected candidates: the function takes in resolutEmail in the form firstname.resoluteai@gmail.com, personal email, password and name */
  const selectedCandidateSignup = async (
    resoluteEmail,
    personalEmail,
    password,
    name
  ) => {
    // While this async function runs, set loading state to true
    setIsLoading(true);

    /* First we are checking whether the personal email is inside selected candidates, to make sure the candidate is selected, we are using async await here to prevent double nesting. */
    try {
      /* We are searching for the personalEmail in the nested objects in selected candidates, the data structure insidte the document is like the this:
      {
        candidateDetails: {
          basicDetails: {
            email: personalEmail
          }
        }
      }
      firebase enables us to search for nested key values using dot notation,
      Learn more about it here : https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
      */
      let querySnapshot = await db
        .collection("SelectedCandidates")
        .where("candidateDetails.basicDetails.email", "==", personalEmail)
        .get();

      /* If the personalEmail isn't present then return an error snackbar using callSnackbar function from Snackbar context.*/
      if (querySnapshot.docs.length === 0) {
        callSnackbar(
          true,
          "You are not a selected applicant, please sign up as a new candidate",
          "error"
        );
        return;
      }

      /* If the personalEmail is present, then we save the reference to that document to update some fields later, we then create the account for that candidate, using the credentials provided. */
      let selectedCandidateDocRef;
      querySnapshot.forEach((doc) => {
        selectedCandidateDocRef = db
          .collection("SelectedCandidates")
          .doc(doc.id);
      });

      // We create the firebase user with the candidate's credential, but we use his/her/they resolute email, instead of personal email.
      const userCredentials = await auth.createUserWithEmailAndPassword(
        resoluteEmail,
        password
      );

      /* After account is created we update some fields that are kind of defaults for the candidate. 
      documentDetails refer to the documents signed by the candidate, set both NDA and agreement to false by default, and version to 0, meaning no version of document assigned. 
      */

      selectedCandidateDocRef.update({
        documentDetails: {
          version: 0,
          NDA: false,
          agreement: false,
        },
        "candidateDetails.profileComplete": false,
        "candidateDetails.basicDetails.fullName": name,
        "candidateDetails.basicDetails.resoluteEmail": resoluteEmail,
        userId: userCredentials.user.uid,
      });
      setIsLoading(false);

      /* again set authentication state to true, to trigger onAuthStateChanged*/
      setIsAuthenticated(true);
      callSnackbar(true, "Account successfully created", "success");
    } catch (err) {
      if (
        err.message ===
        "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
      )
        callSnackbar(
          true,
          "Account with the same email exists already, please try again later",
          "error"
        );
      else
        callSnackbar(true, "An Error Occured Please try again later", "error");
    }
  };

  /* We expose different states to the children components*/
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
