import { useState, useEffect } from "react";
import { db } from "../firebase";

const useCollections = (path, orderBY, where=[]) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBY) {
      collection = collection.orderBy(orderBY);
    }
    const [queryField, queryOperator, queryValue] = where;
    if(queryField){
      collection = collection.where(queryField, queryOperator, queryValue)
    }

    return collection.onSnapshot(snapshot => {
      const docs = [];

      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setDocs(docs);
    });
  }, [path, orderBY]);

  return docs;
};
export default useCollections;
