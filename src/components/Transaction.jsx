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

    return <Row data-testid="transactions">
        <Col>
            <Card border={actionType[transaction.action]} className="transaction">
                <Card.Header onClick={() => setShowInfo(!showInfo)} data-testid="card-header">
                    <Row>
                        <Col xs={2} data-testid="date">
                            {formatDate(transaction.timestamp, 'MM/DD/YYYY')}
                        </Col>
                        <Col xs={5}>
                            <Fade in={!showInfo}>
                                <div data-testid="description-collapsed">{transaction.description}</div>
                            </Fade>
                        </Col>
                        <Col xs={4} sm={4} className="text-right">
                            <span className={transaction.action}>
                                <span data-testid="action-symbol">{transaction.action === 'debit' && "-"}</span>
                                <span data-testid="currency">{CURRENCY_SYMBOLS[transaction.currency]}</span>
                                <span data-testid="amount-label">{parseFloat(transaction.amount).toFixed(2)}</span>
                            </span>
                        </Col>
                        <Col xs={1} style={{textAlign: 'center'}} data-testid="caret">
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
                                    <small className="transaction-type" data-testid="action">({transaction.action})</small>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} data-testid="description-expanded">
                                    {transaction.description}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <small data-testid="time">{formatDate(transaction.timestamp, 'hh:mm a')}</small>
                                </Col>
                            </Row>
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        </Col>
    </Row>

}