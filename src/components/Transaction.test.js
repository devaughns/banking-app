import moment from "moment";
import {fireEvent, render, screen} from "@testing-library/react";
import {Transaction} from "./Transaction";
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const transaction = {
    timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    action: "debit",
    description: "TESTING DESCRIPTION",
    amount: 100.10,
    currency: "YEN"
};

describe("Transaction", () => {

    const setup = (newTransaction) => render(<Transaction transaction={newTransaction || transaction}/>)

    it ("should include a timestamp", () => {
        setup();
        const date = moment(transaction.timestamp, DATE_TIME_FORMAT).format("MM/DD/YYYY");
        const time = moment(transaction.timestamp, DATE_TIME_FORMAT).format("hh:mm a");
        expect(screen.getByTestId('date')).toHaveTextContent(date);
        expect(screen.getByTestId('time')).toHaveTextContent(time);
    });

    it ("should include a description when expanded", () => {
        setup();
        fireEvent.click(screen.getByTestId('card-header'));
        expect(screen.getByTestId('description-expanded')).toHaveTextContent(transaction.description);
    });

    it ("should include a description when collapsed", () => {
        setup();
        expect(screen.getByTestId('description-collapsed')).toHaveTextContent(transaction.description);
    });

    it ("should include an amount", () => {
        setup();
        expect(screen.getByTestId('amount-label')).toBeInTheDocument();
    });

    it ("should format amount as XXXX.XX", () => {
        setup();
        const regex = /^[0-9]{1,4}(?:\.[0-9]{2})?$/;
        expect(regex.test(screen.getByTestId('amount-label').textContent)).toBe(true);
    });

    it.each`
        label    | unicode
        ${'BP'}  | ${'\u00A3'},
        ${'EUR'} | ${'\u20AC'},
        ${'USD'} | ${'$'},
        ${'YEN'} | ${'\u00A5'}
    `('should display the correct currency for $label', ({label, unicode}) => {
        const transaction2 = {...transaction};
        transaction2.currency = label;
        setup(transaction2);
        expect(screen.getByTestId('currency').textContent).toBe(unicode);
    });

    it ("should show the left caret when collapsed", () => {
        setup();
        expect(screen.getByTestId('caret').firstChild).toHaveClass('bi-caret-left');
    });

    it ("should show the down caret when expanded", () => {
        setup();
        fireEvent.click(screen.getByTestId('card-header'));
        expect(screen.getByTestId('caret').firstChild).toHaveClass('bi-caret-down-fill');
    });

});