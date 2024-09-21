import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const initialState = {
    loading: null,
    error: null,
}

function deleteReducer(state, action) {
    switch (action.type) {

        case "LOADING":
            
            return {loading: true, error: null};

        case "DELETED_DOC":
            
            return {loading: false, error: null};

        case "ERROR":
            
            return {loading: true, error: action.payload};
    
        default:
            return state;

    }
}

export function useDeleteDocument(docCollection) {

    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    function checkCancelBeforeDispatch(action) {
        if(!cancelled) {
            dispatch(action);
        }
    }

    async function deleteDocument(id) {

        const deletedDocument = await deleteDoc(doc(db, docCollection, id))

        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument,
            });

        } catch (error) {
            
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });

        }

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return { deleteDocument, response }

}