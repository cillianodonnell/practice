const expect = require('chai').expect;
const invoice = require( '../invoices.json' );
const plays = require( '../plays.json' )
const statement_printer = require( '../main.js')

describe('Refactoring Statement', function()
{
    it('Should match string statement', function()
    {
        statement = "Statement for BigCo\n";
        statement += "  Hamlet: $650.00 (55 seats)\n";
        statement += "  As You Like It: $580.00 (35 seats)\n";
        statement += "  Othello: $500.00 (40 seats)\n";
        statement += "Amount owed is $1,730.00\n";
        statement += "You earned 47 credits\n";

        const bill = statement_printer( invoice, plays );
        expect( bill ).to.be.equal(statement);
    })
} )