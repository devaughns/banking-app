# E-Z Bank

This application was created to be a quick and easy way to view transactions between different accounts as well as
initiate transfers between them.

## Running the Application

While in the project directory, simply run

### `yarn start`

Then navigate to [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing the Application

While in the project directory, run 

### `yarn test`

## Custom Data

The application uses the data stored in the `/public/accounts.json` file to both run and test.

If you'd like to test with different data, simply add/modify the file to include transactions in the following format:

```aidl
{
    "accounts": [
        {
            "id": 4, // number unique between accounts,
            "name": "Savings",
            "transactions": [
                {
                  "id": 11, // number unique between transactions
                  "timestamp": "2021-10-01 01:00:00", 
                  "action": "debit", // 'debit' or 'credit'
                  "description": "Transfer to Checking. Note: For armor repair",
                  "amount": 2039.20, // follows format ####.##
                  "currency": "YEN" // possible values: ["BP", "EUR", "USD", "YEN"]
                }
            ]
        }
    ]
}
```
