/**
 * Created by Martin on 04.01.2015.
 *
 * Page Controller for addPayment page
 *
 * Includes all readers and writers of relevant objects
 */

function PC() {

    this.enableCombobox();
    this.enableAmountSplitter()

}

// Enable Combobox extension
PC.prototype.enableCombobox = function() {
    $(document).ready(function(){
        $('.combobox').combobox();
        // Scroll Combobox to the top when entering data to see more of the drop-down values
        $("input[class~='combobox']").focus( function() {
            scrollTo('#paidWhatLabel')
        });
    });
};

// Enable AmountSplitter functionality
PC.prototype.enableAmountSplit = function() {
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


// Readers and Writers
// functions for reading from and writing to html form

Payment.prototype.readAmount = function() {
    this.amount = $('#amount').val();
}

Payment.prototype.writeAmount = function(value) {
    $('#amount').val(value);
}

AmountShare.prototype.readFullyAssigned = function (personID) {
    // #fullyAssigned<n> is a checkbox
    return $('#fullyAssigned' + this.personID).prop('checked');
}

AmountShare.prototype.writeFullyAssigned = function (personID, value) {
    // #fullyAssigned<n> is a checkbox
    $('#fullyAssigned' + personID).prop('checked', value);
}

AmountShare.prototype.readSplitPercentage = function (personID) {
    return $('#splitPercentage' + personID).val();
}

AmountShare.prototype.writeSplitPercentage = function (personID, value) {
    $('#splitPercentage' + personID).val(value);
}

AmountShare.prototype.readSplitAmount = function (personID) {
    return $('#splitAmount' + personID).val();
}

AmountShare.prototype.writeSplitAmount = function (personID, value) {
    $('#splitAmount' + personID).val(value);
}

AmountShare.prototype.readFixedParameter = function (personID) {
    return $('#fixedParameter' + personID).val();
}

AmountShare.prototype.writeFixedParameter = function (personID, value) {
    $('#fixedParameter' + personID).val(value);
}

// Read amount split lines of all users from form
AmountSplit.prototype.readAmountShares = function() {
    var persons;
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

// Initialize Page Controller
var PC = new PC();