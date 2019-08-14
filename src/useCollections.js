import {useState, useEffect} from 'react';
import {db} from './firebase';

const useCollections = (path, orderBY) => {

  const [docs, setDocs] = useState([]);

  useEffect(() => {

    let colleciton = db.collection(path);

    if(orderBY){
      colleciton = db.collection(path).orderBy(orderBY)
    }

    return colleciton
      .onSnapshot(colleciton => {
        const docs = [];

        colleciton.forEach(doc => {
          docs.push({
            ...doc.data(),
            id:doc.id
          })
        });
        setDocs(docs);
      })

  }, [])

  return docs;
}
export default useCollections;