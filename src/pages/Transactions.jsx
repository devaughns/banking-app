import React, {Fragment, useEffect, useState} from "react";
import {Alert, Button, Card, Col, Collapse, ProgressBar, Row} from "react-bootstrap";
import {Transaction} from "../components/Transaction";
import moment from "moment";
import {TransactionForm} from "../components/TransactionForm";
import {useAccounts} from "../hooks/useAccounts";
import {FormProvider, useForm} from "react-hook-form";

export const Transactions = () => {

    const [data, loading] = useAccounts();
    const [accounts, setAccounts] = useState();
    const [account, setAccount] = useState();
    const [showForm, setShowForm] = useState(false);
    const formMethods = useForm();

    useEffect(() => {
        if (data) {
            setAccounts(data);
        }
    }, [data])

    const sortTransactions = (tran1, tran2) => {
        return moment(tran2.timestamp, 'YYYY-MM-DD HH:mm:ss') - moment(tran1.timestamp, 'YYYY-MM-DD HH:mm:ss');
    }

    return <>
        <Row>
            <Col md={{span: 10, offset: 1}}>
                <h4>Transactions</h4>

                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={6} sm={2}>
                                <b className="form-label">Balance:</b>
                            </Col>
                            <Col xs={6} sm={3} className="text-right">
                                {account
                                    ? (account.startingBalance && account.startingBalance.toFixed(2)) || '000.00'
                                    : <>(N/A)</>
                                }
                            </Col>
                            <Col xs={4} sm={2}>
                                <b className="form-label">Account:</b>
                            </Col>
                            <Col xs={8} sm={5}>
                                {loading && (
                                    <ProgressBar
                                        style={{height: '40px'}}
                                        animated
                                        now={100}
                                        label="Retrieving Accounts..."
                                    />
                                )}
                                {accounts && (
                                    <select
                                        className="form-control"
                                        onChange={e => {
                                            setAccount(accounts.find(it => it.id == e.target.value))
                                        }}
                                    >
                                        <option value="">Please Select an Account</option>
                                        {accounts.map(acc => {
                                            return <option key={acc.id} value={acc.id}>{acc.name}</option>
                                        })}
                                    </select>
                                )}
                            </Col>
                        </Row>

                        <hr/>

                        {!account && (<>
                            <Alert variant="info">
                                Please select an Account
                            </Alert>
                        </>)}
                        {account && (<>
                            {/*TODO: extract the sort out so that it does sort on every render*/}
                            {account.transactions.sort(sortTransactions).map(transaction => {
                                return <Fragment key={transaction.id}>
                                    <Transaction transaction={transaction}/>
                                </Fragment>
                            })}
                        </>)}

                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" disabled={showForm} onClick={() => setShowForm(true)}>
                            <i className="bi bi-arrow-left-right"/> Transfer Funds
                        </Button>
                        <Collapse in={showForm}>
                            <div>
                                <FormProvider {...formMethods}>
                                    <TransactionForm
                                        onCancel={() => {
                                            setShowForm(false)
                                            formMethods.reset();
                                        }}
                                        onSubmit={data => {
                                            console.log(data)
                                        }}
                                    />
                                </FormProvider>
                            </div>
                        </Collapse>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </>

}