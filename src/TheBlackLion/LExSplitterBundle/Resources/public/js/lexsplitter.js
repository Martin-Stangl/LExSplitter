/**
 * Created by Martin on 02.01.2015.
 */




function AmountSplit(Payment) {
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




// Write amount split lines of all users to form
AmountSplit.prototype.writeAmountShares = function() {
    var AmountShare;
    // write to form
    for (var person in this.AmountShares) {
        AmountShare = this.AmountShares[person];
        $('#fullyAssigned'+person).prop('checked', AmountShare.fullyAssigned);
        $('#splitPercentage'+person).val(AmountShare.splitPercentage);
        $('#splitAmount'+person).val(AmountShare.splitAmount);
        $('#fixedParameter'+person).val(AmountShare.fixedParameter);
    }

    // remember data for undo
    this.addUndoHistory();
};

// calculate amount split
AmountSplit.prototype.calculate = function() {
    var AmountShare;
    for (var person in this.AmountShares) {
        AmountShare = this.AmountShares[person];
    }
};

// process changes in the split and output result
AmountSplit.prototype.update = function() {
    this.calculate;
    this.writeAmountShares();
};

// switch to split method Equally
AmountSplit.prototype.setMethodEqually = function() {
    // hide detail split fields
    $('#otherSplitFields').collapse('hide');
    // set fields to not be required
    $("[id^='splitPercentage']").removeAttr("required");
    $("[id^='splitAmount']").removeAttr("required");
};

// switch to split method Other
AmountSplit.prototype.setMethodOther = function() {
    // set fields to be required
    $("[id^='splitPercentage']").prop("required", true);
    $("[id^='splitAmount']").prop("required", true);
    // show detail split fields
    $('#otherSplitFields').collapse('show');
    scrollTo('#splitLabel');
};

// add data to history fur Undo feature
AmountSplit.prototype.addUndoHistory = function() {
    // add current entry to history
    var entry = new this.HistoryEntry();
    entry.Amount = this.Amount;
    entry.AmountShares = this.AmountShares;
    console.log('History length before adding to History: ' + this.History.length);
    this.History.push(entry);
    console.log('History length after adding to History: ' + this.History.length);
    if (this.History.length > this.MAXUNDO) {
        this.History.shift();
    }
    console.log('History length after checking MAXUNDO: ' + this.History.length);
    // enable Undo-Button if something to undo
    if (this.History.length > 1) {
        this.enableUndoButton(true);
    }
};

// enable/disable undo button
AmountSplit.prototype.enableUndoButton = function(enable) {
    if (enable) {
        $('#undoButton').removeAttr("disabled");
    } else {
        $('#undoButton').prop("disabled", true);
    }
};

// perform undo
AmountSplit.prototype.undo = function() {
    var entry = new this.HistoryEntry();
    // last entry in history is what we discard
    this.History.pop();
    // revert to previous values
    entry = this.History.pop();
    this.Amount = entry.Amount;
    this.AmountShares = entry.AmountShares();
    // output previous values to form
    this.writeAmount();
    this.writeAmountShares();
};

// perform clear
AmountSplit.prototype.clear = function() {
    // clear all values

    //DEBUG
    this.AmountShares = this.readAmountShares();
    for (var person in this.AmountShares) {
        console.log('Person = '+person+', fullyAssigned = '+this.AmountShares[person].fullyAssigned);
        console.log('Person = '+person+', splitPercentage = '+this.AmountShares[person].splitPercentage);
        console.log('Person = '+person+', splitAmount = '+this.AmountShares[person].splitAmount);
        console.log('Person = '+person+', fixedParameter = '+this.AmountShares[person].fixedParameter);
/*
        AmountShare = this.AmountShares[person];
        $('#fullyAssigned'+person).val(AmountShare.fullyAssigned);
        $('#splitPercentage'+person).val(AmountShare.splitPercentage);
        $('#splitAmount'+person).val(AmountShare.splitAmount);
        $('#fixedParameter'+person).val(AmountShare.fixedParameter);
*/
    }

};

