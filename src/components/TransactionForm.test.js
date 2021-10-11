import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {TransactionForm} from "./TransactionForm";
import data from "../../public/accounts.json"
import {FormProvider, useForm} from "react-hook-form";

const accounts = () => data.accounts;
jest.mock('../hooks/useAccounts.js', () => ({
    useAccounts: () => [accounts(), false, null]
}));

const renderWithReactHookForm = (ui, { defaultValues = {} } = {}) => {
    const Wrapper = ({ children }) => {
        const methods = useForm({ defaultValues });
        return <FormProvider {...methods}>{children}</FormProvider>;
    };

    return {
        ...render(ui, { wrapper: Wrapper })
    };
}

describe("TransactionForm", () => {

    beforeEach(() => {
        const mockCancel = jest.fn();
        const mockUpdate = jest.fn();
        renderWithReactHookForm(<TransactionForm onSubmit={mockUpdate} onCancel={mockCancel}/>);
    });

    it ("should render the basic fields", async () => {
        expect(screen.getByTestId('from')).toBeInTheDocument();
        expect(screen.getByTestId('to')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toBeInTheDocument();
        expect(screen.getByTestId('amount')).toBeInTheDocument();
    });

    it('renders the Description validation error when Description is %i characters long', async () => {
        const description = 'x'.repeat(101);
        const desc = screen.getByTestId('description');
        fireEvent.change(desc, {target: {value: description}});
        fireEvent.click(screen.getByTestId('submit'));

        await waitFor(() => {
            expect(desc).toHaveValue(description);
            expect(screen.getByTestId('invalid-description')).toHaveTextContent("Description must be 100 characters or fewer");
        });
    });


    describe("Amount", () => {
        it.each([-10, -0.01, 0])('renders the min validation error for Amount when value is %i', async (val) => {
            const amount = screen.getByTestId('amount');
            fireEvent.change(amount, {target: {value: val}});
            fireEvent.click(screen.getByTestId('submit'));

            await waitFor(() => {
                expect(amount).toHaveValue(val);
                expect(screen.getByTestId('invalid-amount')).toHaveTextContent("Amount must be greater than 0");
            });
        });

        it.each([10000, 10000.00, 99999])('renders the max validation error for Amount when value is %i', async (val) => {
            const amount = screen.getByTestId('amount');
            fireEvent.input(amount, {target: {value: val}});
            fireEvent.click(screen.getByTestId('submit'));

            await waitFor(() => {
                expect(amount).toHaveValue(val);
                expect(screen.getByTestId('invalid-amount')).toHaveTextContent("Amount must be less than 10,000.00");
            });
        });

        it.each([100.001])('renders the pattern validation error for Amount when value is %i', async (val) => {
            const amount = screen.getByTestId('amount');
            fireEvent.input(amount, {target: {value: val}});
            fireEvent.click(screen.getByTestId('submit'));

            await waitFor(() => {
                expect(amount).toHaveValue(val);
                expect(screen.getByTestId('invalid-amount')).toHaveTextContent("Incorrect format");
            });
        });

        it ('renders the Amount required validation error', async () => {
            fireEvent.click(screen.getByTestId('submit'));

            await waitFor(() => {
                expect(screen.getByTestId('invalid-amount')).toHaveTextContent("Amount cannot be blank");
            });
        });
    })

})