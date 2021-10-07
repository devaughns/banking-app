import React, {useEffect, useState} from "react";
import {useForm, useFormContext, FormProvider} from "react-hook-form";
import {Button, Col, Dropdown, DropdownButton, Form, InputGroup} from "react-bootstrap";
import {CURRENCY_SYMBOLS} from "../util/currencies";


export const TransactionForm = ({onSubmit, onCancel}) => {

    const form = useForm();

    const cancel = () => {
        onCancel && onCancel();
        form.reset();
    }

    const submit = (data) => {
        onSubmit && onSubmit(data);
        form.reset();
    }

    return <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(submit)}>
            <Form.Row>
                <Col sm={5}>
                    <Form.Label>From Account*</Form.Label>
                    <Form.Control as="select" {...form.register('from')}>
                        <option value="">Select From Account</option>
                        <option value={'1'}>test1</option>
                        <option value={'2'}>test2</option>
                    </Form.Control>
                    <Form.Control.Feedback>Testing message</Form.Control.Feedback>
                </Col>
                <Col sm={2} className="text-center d-none d-sm-block" style={{paddingTop: '37px'}}>
                    <i className="bi bi-arrow-right"/>
                </Col>
                <Col sm={5}>
                    <Form.Label>To Account*</Form.Label>
                    <Form.Control as="select" {...form.register('to')}>
                        <option value="">Select To Account</option>
                        <option value={'1'}>test1</option>
                        <option value={'2'}>test2</option>
                    </Form.Control>
                    <Form.Control.Feedback>Testing message</Form.Control.Feedback>
                </Col>
            </Form.Row>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" {...form.register('description')}/>
                <Form.Control.Feedback>Testing message</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label>Amount*</Form.Label>
                <InputGroup>
                    <Currency/>
                    <Form.Control
                        type="number"
                        step={0.01}
                        min={0}
                        {...form.register('amount')}
                    />
                </InputGroup>
            </Form.Group>

            <Button type="submit" variant="success">
                Submit
            </Button>
            <Button type="button" onClick={cancel} variant="secondary">
                Cancel
            </Button>
        </Form>
    </FormProvider>

}

const Currency = () => {

    const form = useFormContext();
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
        if (currency) {
            form.setValue('currency', currency);
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