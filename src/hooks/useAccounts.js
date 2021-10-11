import {useEffect, useState} from "react";
import axios from "axios";

export const useAccounts = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data) {
            setLoading(false);
            setError(false);
        }
    }, [data]);

    useEffect(() => {
        axios.get('./accounts.json')
            .then(res => setData(res.data.accounts))
            .catch(err => setError(err));
    }, []);

    return [
        data,
        loading,
        error
    ]

}