import React, {Fragment, useState} from "react";
import {Card, Col, ProgressBar, Row} from "react-bootstrap";
import {Transaction} from "./Transaction";
import moment from "moment";
import {AccountSelect} from "../components/AccountSelect";

export const Account = () => {

    const [account, setAccount] = useState();

    const sortTransactions = (tran1, tran2) => {
        return moment(tran2.timestamp, 'YYYY-MM-DD HH:mm:ss') - moment(tran1.timestamp, 'YYYY-MM-DD HH:mm:ss');
    }

    return <>
        <Row>
            <Col md={{span: 10, offset: 1}}>
                <h4>Transactions</h4>

                <Card>
                    <Card.Header>
                        <AccountSelect onUpdate={setAccount}/>
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
                </Card>
            </Col>
        </Row>
    </>

}