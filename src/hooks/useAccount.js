import {useEffect, useState} from "react";
import data from "../accounts.json";

export const useAccount = (accountNumber) => {

    const [account, setAccount] = useState(null); //were this prod code, I would call an api from here, and on resp, set the account info
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (account) {
            setLoading(false);
        } else {
            setError({
                message: "Something went wrong"
            })
        }
    }, [account]);

    setTimeout(() => {
        setAccount(data.accounts.find(it => it.id === accountNumber))
    }, 2000);

    return [
        account,
        loading,
        error
    ]


}