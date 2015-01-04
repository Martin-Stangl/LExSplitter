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
