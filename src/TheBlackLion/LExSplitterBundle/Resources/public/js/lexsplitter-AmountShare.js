/**
 * Created by Martin on 04.01.2015.
 */

// Object AmountShare: for single line of amount split table
function AmountShare (personID) {
    // Constructor
    this.personID = personID;
    this.fullyAssigned = $('#fullyAssigned'+this.personID).prop('checked');
    this.splitPercentage = $('#splitPercentage'+this.personID).val();
    this.splitAmount = $('#splitAmount'+this.personID).val();
    this.fixedParameter = $('#fixedParameter'+this.personID).val();
};


AmountShare.prototype.readFullyAssigned = function(personID) {
    return $('#fullyAssigned'+this.personID).prop('checked');
};

AmountShare.prototype.writedFullyAssigned = function(personID, value) {
    $('#fullyAssigned'+personID).prop('checked', value);
};

AmountShare.prototype.readSplitPercentage = function(personID) {
    return $('#splitPercentage'+this.personID).val();
};

AmountShare.prototype.writeSplitPercentage = function(personID, value) {
    $('#splitPercentage'+person).val(value);
};
