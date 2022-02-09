import { db } from "../firebase/Firebase";

// Firebase function to get all documents where field == match
export const getAllDocumentsWithWhere = async (collection, field, match) => {
  let list = await db
    .collection(collection)
    .where(field, "==", match)
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return list;
};

// Firebase function to get all documents from a particular a collection
export const getAllDocuments = async (collection) => {
  let list = await db
    .collection(collection)
    .get()
    .then((querySnaphot) => {});
};
