/**
 * Created by Martin on 02.01.2015.
 */

// Animated scroll to object with ID targetID
function scrollTo (targetID) {
    $('html, body').animate({scrollTop: $(targetID).offset().top}, 'slow');
};

// round to n decimal places
function round (number, places) {
    return +(Math.round(number + "e+" + places)  + "e-" + places);
};

// Object AmountShare: for single line of amount split table
function AmountShare (personID) {
    this.person = personID;
    this.fullyAssigned = $('#fullyAssigned'+this.person).prop('checked');
    this.splitPercentage = $('#splitPercentage'+this.person).val();
    this.splitAmount = $('#splitAmount'+this.person).val();
    this.fixedParameter = $('#fixedParameter'+this.person).val();
};


// Object AmountSplit: Object with amount split information, splitting logic and splitting calulation
function AmountSplit() {
    this.MAXUNDO = 1000;

    this.Amount = this.readAmount();
    this.AmountShares = this.readAmountShares();
    this.History = {};
    // if split method other is set initially, update the splitting calculation
    // to hide any differences between the frontend and backend calculation
    this.update();
};

// Read amount from form
AmountSplit.prototype.readAmount = function() {
    this.Amount = $('#amount').val();
};

AmountSplit.prototype.setAmount = function(Amount) {
    this.Amount = Amount;
    // Process changes
    this.update()
};

// Read amount split lines of all users from form
AmountSplit.prototype.readAmountShares = function() {
    var person;
    var AmountShares = {};
    // find all persons by looking for the paymentBy* entries
    persons = $("[id^='paymentBy']")

    // process all found persons and get an AmountShare object
    persons.each( function() {
            AmountShares[$(this).attr("value")] = new AmountShare($(this).attr("value"));
        }
    )
    return AmountShares;
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
    console.log('History length before adding to History: ' + this.AmountSharesHistory.length);
    this.AmountSharesHistory.push(this.AmountShares);
    console.log('History length after adding to History: ' + this.AmountSharesHistory.length);
    if (this.AmountSharesHistory.length > this.MAXUNDO) {
        this.AmountSharesHistory.shift();
    }
    console.log('History length after checking MAXUNDO: ' + this.AmountSharesHistory.length);
    // enable Undo-Button if something to undo
    if (this.AmountSharesHistory.length > 1) {
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
    // last entry in history is what we discard
    this.AmountSharesHistory.pop();
    // revert to previous values
    this.AmountShares = this.AmountSharesHistory.pop();
    // output previous values to form
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


// Enable Combobox extension
function enableCombobox () {
    $(document).ready(function(){
        $('.combobox').combobox();
        // Scroll Combobox to the top when entering data to see more of the drop-down values
        $("input[class~='combobox']").focus( function() {
            scrollTo('#paidWhatLabel')
        });
    });
};

// Enable AmountSplit functionality
function enableAmountSplit () {
    $(document).ready(function(){
        var AmountSplitObj;
        AmountSplitObj = new AmountSplit();

        // Listen to changes of #amount
        $('#amount').on('input', function() {
            AmountSplitObj.setAmount($(this).val());
        });

        // Listen for split method selection
        $('#splitMethod1').change(function() {
            AmountSplitObj.setMethodEqually();
        });
        $('#splitMethod2').change(function() {
            AmountSplitObj.setMethodOther();
        });

        // Listen for full assignment to one person
        $("[id^='fullyAssigned']").change(function() {
            if (this.checked) {
                //AmountSplitObj.setPersonfullyAssigned();
            }
        });

        // Listen for pressing of undo button
        $('#undoButton').click(function() {
            AmountSplitObj.undo();
        });

        // Listen for pressing of clear button
        $('#clearButton').click(function() {
            AmountSplitObj.clear();
        });

    });
};