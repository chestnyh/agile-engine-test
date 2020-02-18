import express from "express";
const app = express();
import bodyParser from "body-parser";

import {Account, isReport} from "./account";

import {Debit} from "./transactions/debit"
import {Credit} from "./transactions/credit"

import {DebitsStorage} from "./transactions-storage/debits-storage";
import {CreditsStorage} from "./transactions-storage/credits-storage";

import {ErrorResponse} from "./response";

const debitsStorage: DebitsStorage = new DebitsStorage();
const creditsStorage: CreditsStorage = new CreditsStorage();

const INIT_ACCOUNT_BALANCE = 0;
const PORT = 3000;

const account: Account = new Account(INIT_ACCOUNT_BALANCE, creditsStorage, debitsStorage);

app.use(bodyParser.json());

// Add debit
app.post('/debits', (req, res) => {
    try{

        const amount = (req.body && req.body.amount && parseInt(req.body.amount)) ? parseInt(req.body.amount) : undefined;

        if(!amount || amount < 0){
            const errorResponse: ErrorResponse = {code: 400, message: "amount param is required and have to be positive"};
            return res.status(400).json(errorResponse);
        }

        const result = account.setDebit(
            new Debit({amount})
        );

        if(!result.success || amount < 0){
            const errorResponse: ErrorResponse = {code: 403, message: result.message};
            res.status(403).json(errorResponse);
        }

        return res.status(201).send(); //Successfully added

    }
    catch(error){
        console.error(error);
        const errorResponse: ErrorResponse = {code: 500, message: "Internal server error"};
        return res.status(500).json(errorResponse);
    }
});

// Add debit
app.post('/credits', function (req, res) {
    try{

        const amount = (req.body && req.body.amount && parseInt(req.body.amount)) ? parseInt(req.body.amount) : undefined;

        if(!amount){
            const errorResponse: ErrorResponse = {code: 400, message: "amount param is required and have to be positive"};
            return res.status(400).json(errorResponse);
        }

        const result = account.setCredit(
            new Credit({amount})
        );

        if(!result.success || amount < 0){
            const errorResponse: ErrorResponse = {code: 403, message: result.message};
            res.status(403).json(errorResponse);
        }

        return res.status(201).send(); //Successfully added

    }
    catch(error){
        console.error(error.code);
        const errorResponse: ErrorResponse = {code: 500, message: "Internal server error"};
        return res.status(500).json(errorResponse);
    }
});


// Get account info

app.get("/accounts", function(req, res){
    try{

        const result = account.getBalance();

        if(isReport(result) && !result.success){
            const errorResponse: ErrorResponse = {code: 403, message: result.message};
            res.status(403).json(errorResponse);
        }

        return res.status(200).json({ balance: result });
    }
    catch(error){
        console.error(error);
        const errorResponse: ErrorResponse = {code: 500, message: "Internal server error"};
        return res.status(500).json(errorResponse);
    }
});

// Get credit
app.get('/credits', function (req, res) {
    try{

        const result = account.getCredits();

        if(isReport(result) && !result.success){
            const errorResponse: ErrorResponse = {code: 403, message: result.message};
            res.status(403).json(errorResponse);
        }

        return res.status(200).json(result);
    }
    catch(error){
        console.error(error);
        const errorResponse: ErrorResponse = {code: 500, message: "Internal server error"};
        return res.status(500).json(errorResponse);
    }
});

// Get debit
app.get('/debits', function (req, res) {
    try{
        const result = account.getDebits();

        if(isReport(result) && !result.success){
            const errorResponse: ErrorResponse = {code: 403, message: result.message};
            res.status(403).json(errorResponse);
        }

        return res.status(200).json(result);
    }
    catch(error){
        console.error(error);
        const errorResponse: ErrorResponse = {code: 500, message: "Internal server error"};
        return res.status(500).json(errorResponse);
    }
});


app.listen(PORT, (error) => {
    // TODO handler
});