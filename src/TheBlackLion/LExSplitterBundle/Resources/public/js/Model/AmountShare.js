/**
 * Created by Martin on 04.01.2015.
 *
 * Object AmountShare: for single line of amount split table
 * Object AmountShares: List of Amount Shares
 */


function AmountShare() {
    // Constructor
    this.personID = null;
    this.fullyAssigned = false;
    this.splitPercentage = 0;
    this.splitAmount = 0;
    this.fixedParameter = "";
}

function AmountShares() {
    // Constructor
    this.AmountShares = {};
}
