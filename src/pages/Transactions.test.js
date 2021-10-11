import {Transactions} from "./Transactions";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import data from "../../public/accounts.json"

const accounts = () => data.accounts;
jest.mock('../hooks/useAccounts.js', () => ({
    useAccounts: () => [accounts(), false, null]
}))

describe("Transactions", () => {

    const setup = () => render(<Transactions/>);

    it ("should load without an account selected", async () => {
        setup();
        expect(screen.getByTestId('no-account-alert')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId('accounts')).toBeInTheDocument();
        })
    });

    it ("should show transactions after an account is selected", () => {
        const {container} = setup();
        fireEvent.change(screen.getByTestId('accounts'), {target: {value: 1}});
        expect(container.getElementsByClassName('transaction').length).toBeGreaterThan(0);
    })

    it ("should add a transaction after submit", async () => {
        const {container} = setup();
        fireEvent.change(screen.getByTestId('accounts'), {target: {value: 1}})
        const numberOfTransactions = container.getElementsByClassName('transaction').length;
        fireEvent.click(screen.getByTestId('transferBtn'));
        fillForm(1, 2, 'test description', 100);
        fireEvent.click(screen.getByTestId('submit'));
        await waitFor(() => {
            expect(container.getElementsByClassName('transaction').length).toBe(numberOfTransactions + 1);
        });
    });

    it ("should display a new debit in the 'from' account and a new credit in the 'to' account", async () => {
        const {container} = setup();
        const from = 1;
        const to = 2;
        fireEvent.click(screen.getByTestId('transferBtn'));
        fillForm(from, to, 'New transfer', 400);
        fireEvent.click(screen.getByTestId('submit'));
        selectAccount(from);
        await waitFor(() => {
            expect(container.getElementsByClassName('transaction')[0].getElementsByClassName('transaction-type')[0].textContent).toBe('(debit)');
        });
        selectAccount(to);
        await waitFor(() => {
            expect(container.getElementsByClassName('transaction')[0].getElementsByClassName('transaction-type')[0].textContent).toBe('(credit)');
        });
    });

    const selectAccount = (id) => {
        fireEvent.change(screen.getByTestId('accounts'), {target: {value: id}});
    }

    const fillForm = (from, to, desc, amt) => {
        fireEvent.change(screen.getByTestId('from'), {target: {value: from}});
        fireEvent.change(screen.getByTestId('to'), {target: {value: to}});
        fireEvent.input(screen.getByTestId('description'), {target: {value: desc}});
        fireEvent.input(screen.getByTestId('amount'), {target: {value: amt}});
    };



});