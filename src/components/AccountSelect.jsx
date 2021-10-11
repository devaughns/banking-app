import {useAccounts} from "../hooks/useAccounts";
import {useFormContext} from "react-hook-form";
import {Form, ProgressBar} from "react-bootstrap";
import React from "react";

export const AccountSelect = ({name, validator={}, noSelect}) => {

    const [data, loading] = useAccounts();
    const {formState: {errors}, register} = useFormContext();

    return <>
        {loading && (
            <ProgressBar
                style={{height: '40px'}}
                animated
                now={100}
                data-testid={`${name}-progress`}
                label="Retrieving Accounts..."
            />
        )}
        {data && (<>
            <Form.Control
                as="select"
                {...register(name, validator)}
                isInvalid={errors && errors[name]}
                data-testid={name}
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