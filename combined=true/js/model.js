/**
 * Created by Martin on 04.01.2015.
 *
 * Object Person
 * Object: List of persons
 */

function Person() {
    this.personID;
}

function Persons() {
    this.persons = {};
}
/**
 * Created by Martin on 04.01.2015.
 *
 * Object: List of persons
 */


}
/**
 * Created by Martin on 04.01.2015.
 *
 * Object AmountShare: for single line of amount split table
 */


function AmountShare(personID) {
    // Constructor
    this.personID = personID;
    this.fullyAssigned = this.readFullyAssigned(personID);
    this.splitPercentage = this.readSplitAmount(personID);
    this.splitAmount = $('#splitAmount' + this.personID).val();
    this.fixedParameter = $('#fixedParameter' + this.personID).val();
}

/**
 * Created by Martin on 04.01.2015.
 *
 * Object: List of Amount Shares
 */

function AmountShares() {
    // Constructor
    this.AmountShares = this.readAmountShares();


}

/**
 * Created by Martin on 04.01.2015.
 *
 * Object AmountSplitter: Object with amount split information, splitting logic and splitting calculation
 */

function AmountSplitter(Payment) {
    this.AmountShares = this.readAmountShares();

    this.HistoryEntry = function() {
        var Amount;
        var AmountShares;
    }
    this.History = [];

    // if split method other is set initially, update the splitting calculation
    // to hide any differences between the frontend and backend calculation
    this.update();
};
/**
 * Created by Martin on 04.01.2015.
 *
 * Payment object
 */

function Payment() {
    this.amount;
}
