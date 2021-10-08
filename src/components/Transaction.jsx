import React, {useState} from "react";
import {Row, Collapse, Col, Card, Fade} from "react-bootstrap";
import moment from "moment";
import {CURRENCY_SYMBOLS} from "../util/currencies";

export const Transaction = ({transaction, show}) => {

    const [showInfo, setShowInfo] = useState(show || false);

    const actionType = {
        debit: 'danger',
        credit: 'success'
    };

    const formatDate = (date, format) => {
        return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format);
    }

    return <Row>
        <Col>
            <Card border={actionType[transaction.action]} className="transaction">
                <Card.Header onClick={() => setShowInfo(!showInfo)}>
                    <Row>
                        <Col xs={2}>
                            {formatDate(transaction.timestamp, 'MM/DD/YYYY')}
                        </Col>
                        <Col xs={5}>
                            <Fade in={!showInfo}>
                                <div>{transaction.description}</div>
                            </Fade>
                        </Col>
                        <Col xs={4} sm={4} className="text-right">
                            <span className={transaction.action}>
                                {transaction.action === 'debit' && "-"}
                                {CURRENCY_SYMBOLS[transaction.currency]}
                                {parseFloat(transaction.amount).toFixed(2)}
                            </span>
                        </Col>
                        <Col xs={1} style={{textAlign: 'center'}}>
                            {showInfo
                                ? <i className="bi bi-caret-down-fill"/>
                                : <i className="bi bi-caret-left"/>
                            }
                        </Col>
                    </Row>
                </Card.Header>
                <Collapse in={showInfo}>
                    <div>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <small>({transaction.action})</small>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    {transaction.description}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <small>{formatDate(transaction.timestamp, 'hh:mm a')}</small>
                                </Col>
                            </Row>
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        </Col>
    </Row>

}