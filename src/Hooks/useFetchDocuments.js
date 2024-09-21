import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    where, 
    QuerySnapshot
} from "firebase/firestore";

export function useFetchDocuments(docCollection, uid = null) {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if(cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {

                let q;

                if(uid) {
                    q = await query(
                        collectionRef, 
                        where("uid", "==", uid),
                        orderBy('createdAt', 'asc')
                    );
                } else {
                    q = await query(collectionRef, orderBy('createdAt', 'asc'))
                }

                await onSnapshot(q, (querySnapshot) => {

                    setDocuments(

                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))

                    )
                    setLoading(false);

                })

            } catch(error) {
                
                console.log(error.message);
                setError(error.message);
                setLoading(false);

            }

        }

        loadData();

    }, [docCollection, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
}

