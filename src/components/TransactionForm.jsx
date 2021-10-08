import React, {useEffect, useState} from "react";
import {useFormContext, FormProvider} from "react-hook-form";
import {Button, Col, Dropdown, DropdownButton, Form, InputGroup, ProgressBar} from "react-bootstrap";
import {CURRENCY_SYMBOLS} from "../util/currencies";
import {useAccounts} from "../hooks/useAccounts";

export const TransactionForm = ({onSubmit, onCancel}) => {

    const { formState: {errors}, getValues, handleSubmit, register, trigger} = useFormContext();

    return <>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <Col sm={5}>
                    <Form.Label>From Account*</Form.Label>
                    <AccountSelect
                        name="from"
                        // onChange={() => trigger("to")}
                        validator={{
                            validate: {
                                notEmpty: val => val !== "" || "From Account cannot be blank",
                                distinct: val => val !== getValues("to") || "From Account must be different than To Account"
                            }
                        }}
                    />
                </Col>
                <Col sm={2} className="text-center d-none d-sm-block" style={{paddingTop: '37px'}}>
                    <i className="bi bi-arrow-right"/>
                </Col>
                <Col sm={5}>
                    <Form.Label>To Account*</Form.Label>
                    <AccountSelect
                        name="to"
                        // onChange={() => trigger("from")}
                        validator={{
                            validate: {
                                notEmpty: val => val !== "" || "To Account cannot be blank",
                                distinct: val => val !== getValues("from") || "To Account must be different than From Account"
                            }
                        }}
                    />
                </Col>
            </Form.Row>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    isInvalid={errors && errors.description}
                    {...register('description', {
                        maxLength: {
                            value: 100,
                            message: "Description must be 100 characters or fewer"
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors && errors.description && errors.description.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label>Amount*</Form.Label>
                <InputGroup>
                    <Currency/>
                    <Form.Control
                        type="number"
                        step={0.01}
                        isInvalid={errors && errors.amount}
                        {...register('amount', {
                            required: "Amount cannot be blank",
                            min: {
                               value: .01,
                               message: "Amount must be greater than 0"
                            },
                            max: {
                                value: 9999.99,
                                message: "Amount must be less than 10,000.00"
                            },
                            pattern: {
                                value: /^[0-9]{1,4}(?:\.[0-9]{2})?$/,
                                message: "Incorrect format"
                            }
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors && errors.amount && errors.amount.message}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Button type="submit" variant="success">
                Submit
            </Button>
            <Button type="button" onClick={onCancel} variant="secondary">
                Cancel
            </Button>
        </Form>
    </>

}

const Currency = () => {

    const {setValue} = useFormContext();
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
        if (currency) {
            setValue('currency', currency);
        }
    }, [currency]);

    return <>
        <DropdownButton title={CURRENCY_SYMBOLS[currency]} as={InputGroup.Prepend} variant="outline-secondary">
            <Dropdown.Item onClick={() => setCurrency('USD')}>$</Dropdown.Item>
            <Dropdown.Item onClick={() => setCurrency('BP')}>{CURRENCY_SYMBOLS['BP']}</Dropdown.Item>
            <Dropdown.Item onClick={() => setCurrency('EUR')}>{CURRENCY_SYMBOLS['EUR']}</Dropdown.Item>
            <Dropdown.Item onClick={() => setCurrency('YEN')}>{CURRENCY_SYMBOLS['YEN']}</Dropdown.Item>
        </DropdownButton>
    </>
}

const AccountSelect = ({name, validator={}, onChange, noSelect}) => {

    const [data, loading] = useAccounts();
    const {formState: {errors}, register} = useFormContext();

    return <>
        {loading && (
            <ProgressBar
                style={{height: '40px'}}
                animated
                now={100}
                label="Retrieving Accounts..."
            />
        )}
        {data && (<>
            <Form.Control
                as="select"
                {...register(name, validator)}
                isInvalid={errors && errors[name]}
            >
                <option value="">{noSelect || 'Please select an option'}</option>
                {data && data.map(acc => {
                    return <option key={acc.id} value={acc.id}>{acc.name}</option>
                })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
                { errors && errors[name] && errors[name].message }
            </Form.Control.Feedback>
        </>)}
    </>

}