import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Col, Collapse, ProgressBar, Row} from "react-bootstrap";
import {Transaction} from "./Transaction";
import moment from "moment";
import {AccountSelect} from "../components/AccountSelect";
import {TransactionForm} from "../components/TransactionForm";

export const Account = () => {

    const [account, setAccount] = useState();
    const [showForm, setShowForm] = useState(false);

    const sortTransactions = (tran1, tran2) => {
        return moment(tran2.timestamp, 'YYYY-MM-DD HH:mm:ss') - moment(tran1.timestamp, 'YYYY-MM-DD HH:mm:ss');
    }

    return <>
        <Row>
            <Col md={{span: 10, offset: 1}}>
                <h4>Transactions</h4>

                <Card>
                    <Card.Header>
                        <Row>
                            <Col xs={6} sm={2}>
                                <b className="form-label">Balance:</b>
                            </Col>
                            <Col xs={6} sm={3} className="text-right">
                                {(account && account.startingFunds && account.startingFunds.toFixed(2)) || '000.00'}
                            </Col>
                            <Col xs={4} sm={2}>
                                <b className="form-label">Account:</b>
                            </Col>
                            <Col xs={8} sm={5}>
                                <AccountSelect onUpdate={setAccount}/>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {!account && (<>
                            <ProgressBar
                                style={{height: '40px'}}
                                animated
                                now={100}
                                label="Retrieving Account Info..."
                            />
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
                        <Button variant="outline-success" disabled={showForm} onClick={() => setShowForm(true)}>
                            <i className="bi bi-arrow-left-right"/> Transfer Funds
                        </Button>
                        <Collapse in={showForm}>
                            <div>
                                <TransactionForm
                                    onCancel={() => setShowForm(false)}
                                    onSubmit={data => {
                                        console.log(data)
                                    }}
                                />
                            </div>
                        </Collapse>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </>

}