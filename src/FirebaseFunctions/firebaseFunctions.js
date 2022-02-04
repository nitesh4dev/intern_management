import { db } from "../firebase/Firebase";
export const getAllDocumentsWithWhere = async (collection, field, match) => {
  console.log(collection, field, match);
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
