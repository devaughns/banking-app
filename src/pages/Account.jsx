import React, {Fragment, useEffect, useState} from "react";
import {Card, Carousel, Col, ProgressBar, Row} from "react-bootstrap";
import {Transaction} from "./Transaction";
import {useAccount} from "../hooks/useAccount";
import moment from "moment";

export const Account = ({accountNumber}) => {

    const [account, loading, error] = useAccount(accountNumber);

    console.log('called Account')

    const sortTransactions = (tran1, tran2) => {
        return moment(tran2.timestamp, 'YYYY-MM-DD HH:mm:ss') - moment(tran1.timestamp, 'YYYY-MM-DD HH:mm:ss');
    }

    return <>
        <Row>
            <Col md={{span: 10, offset: 1}}>
                {loading && (<>
                    <ProgressBar
                        animated
                        now={100}
                        label="Retrieving Account Info..."
                    />
                </>)}
                {account && (<>
                    <h4>Account:</h4>
                    <h4>Transactions:</h4>
                    {/*TODO: extract the sort out so that it does sort on every render*/}
                    {account.transactions.sort(sortTransactions).map(transaction => {
                        return <Fragment key={transaction.id}>
                            <Transaction transaction={transaction}/>
                        </Fragment>
                    })}
                </>)}
            </Col>
        </Row>
    </>

}