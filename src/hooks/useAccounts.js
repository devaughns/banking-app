import {useEffect, useState} from "react";
import axios from "axios";

export const useAccounts = () => {

    const [accounts, setAccounts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (accounts) {
            setLoading(false);
            setError(false);
        }
    }, [accounts]);

    useEffect(() => {
        axios.get('./accounts.json')
            .then(res => setAccounts(res.data.accounts))
            .catch(err => setError(err));
    }, []);

    return [
        accounts,
        loading,
        error
    ]

}