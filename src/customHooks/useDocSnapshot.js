import { useState, useEffect } from "react";
import { db } from "../firebase";

const useDocSnapShot = path => {
  const [doc, setDoc] = useState();

  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      setDoc({
        ...doc.data(),
        id: doc.id
      });
    });
  }, [path]);
  return doc;
};

export default useDocSnapShot;
