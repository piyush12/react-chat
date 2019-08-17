import { useState, useEffect } from "react";
import { db } from "../firebase";

const useDoc = path => {
  const [doc, setDoc] = useState();

  useEffect(() => {
    let isMounted = true;
    db.doc(path)
      .get()
      .then(doc => {
        if (isMounted) {
          setDoc({
            ...doc.data(),
            id: doc.id
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [path]);
  return doc;
};

export default useDoc;
