import React, {Fragment, useEffect, useState} from "react";
import {Alert, Button, Card, Col, Collapse, ProgressBar, Row} from "react-bootstrap";
import {Transaction} from "../components/Transaction";
import moment from "moment";
import {TransactionForm} from "../components/TransactionForm";
import {useAccounts} from "../hooks/useAccounts";
import {FormProvider, useForm} from "react-hook-form";
import {getNextId} from "../util/getNextId";

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const Transactions = () => {

    const [data, loading] = useAccounts();
    const [accounts, setAccounts] = useState();
    const [account, setAccount] = useState();
    const [showForm, setShowForm] = useState(false);
    const formMethods = useForm();

    useEffect(() => {
        if (data && JSON.stringify(data) !== JSON.stringify(accounts)) {
            setAccounts(data);
        }
    }, [data]);

    const sortTransactions = (tran1, tran2) => {
        return moment(tran2.timestamp, DATE_FORMAT) - moment(tran1.timestamp, DATE_FORMAT);
    }

    const getAccountById = (id) => {
        return accounts && accounts.find(it => it.id == id);
    }

    const onSubmit = (data) => {
        debitTransfer(data, getAccountById(data.from));
        creditTransfer(data, getAccountById(data.to))
    }

    const debitTransfer = (transfer, account) => {
        const transaction = {
            id: getNextId(account.transactions), // simulating a DB sequence
            timestamp: moment().format(DATE_FORMAT),
            action: "debit",
            description: transfer.description ? transfer.description : transferDescription(transfer),
            amount: transfer.amount,
            currency: transfer.currency
        };
        const acct = {...account};
        acct.transactions.push(transaction);
        updateAccountInList(acct);
    }

    const creditTransfer = (transfer, account) => {
        const transaction = {
            id: getNextId(account.transactions),
            timestamp: moment().format(DATE_FORMAT),
            action: "credit",
            description: transfer.description ? transfer.description : transferDescription(transfer),
            amount: transfer.amount,
            currency: transfer.currency
        };
        const acct = {...account};
        acct.transactions.push(transaction);
        updateAccountInList(acct);
    }

    const updateAccountInList = (account) => {
        const accts = [...accounts];
        const acctIndex = accts.findIndex(it => it.id == account.id);
        accts[acctIndex] = account;
        setAccounts(accts);
    }

    const transferDescription = (transfer) => {
        const from = getAccountById(transfer.from);
        const to = getAccountById(transfer.to)
        return `Transfer from ${from.name} to ${to.name}`;
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
                                        data-testid="accounts-progress"
                                        label="Retrieving Accounts..."
                                    />
                                )}
                                {accounts && (
                                    <select
                                        className="form-control"
                                        data-testid="accounts"
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
                            <Alert variant="info" data-testid="no-account-alert">
                                Please select an Account
                            </Alert>
                        </>)}
                        {account && (<>
                            {account.transactions.sort(sortTransactions).map(transaction => {
                                return <Fragment key={transaction.id}>
                                    <Transaction transaction={transaction}/>
                                </Fragment>
                            })}
                        </>)}
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            variant="success"
                            disabled={showForm}
                            onClick={() => setShowForm(true)}
                            data-testid="transferBtn"
                        >
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
                                            onSubmit(data);
                                            setShowForm(false);
                                            formMethods.reset();
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