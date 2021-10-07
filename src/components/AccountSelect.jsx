import React, {useEffect, useState} from "react";
import {Col, Form, ProgressBar, Row} from "react-bootstrap";
import {useAccounts} from "../hooks/useAccounts";

export const AccountSelect = ({onUpdate}) => {

    const [accounts, loading, error] = useAccounts();
    const [account, setAccount] = useState();

    useEffect(() => {
        if (account) {
            onUpdate(account);
        }
    }, [account]);

    useEffect(() => {
        if (accounts) {
            setAccount(accounts[0]);
        }
    }, [accounts])

    const getAccount = (id) => {
        return accounts.find(it => it.id == id);
    }

    return <>
        <Row>
            <Col xs={6} className='text-right'>
                <h5 className="form-label"><b>Account:</b></h5>
            </Col>
            <Col xs={6}>
                {loading && (
                    <ProgressBar
                        style={{height: '40px'}}
                        animated
                        now={100}
                        label="Retrieving Accounts..."
                    />
                )}
                {accounts && (
                    <select className="form-control" onChange={e => setAccount(getAccount(e.target.value))}>
                        {accounts.map(acc => {
                            return <option key={acc.id} value={acc.id}>{acc.name}</option>
                        })}
                    </select>
                )}
            </Col>
        </Row>
    </>

}