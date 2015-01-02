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
    this.fullyAssigned = $('#fullyAssigned'+this.person).val();
    this.splitPercentage = $('#splitPercentage'+this.person).val();
    this.splitAmount = $('#splitAmount'+this.person).val();
    this.fixedParameter = $('#fixedParameter'+this.person).val();
};


// Object AmountSplit: Object with amount split information, splitting logic and splitting calulation
function AmountSplit() {
    this.Amount = this.readAmount();
    this.AmountShares = this.readAmountShares();
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
    for (var person in this.AmountShares) {
        AmountShare = this.AmountShares[person];
        $('#fullyAssigned'+person).val(AmountShare.fullyAssigned);
        $('#splitPercentage'+person).val(AmountShare.splitPercentage);
        $('#splitAmount'+person).val(AmountShare.splitAmount);
        $('#fixedParameter'+person).val(AmountShare.fixedParameter);
    }
};

// calculate amount split
AmountSplit.prototype.calculate = function() {
    var AmountShare;
    for (var person in this.AmountShares) {
        AmountShare = this.AmountShares[person];

        $('#fullyAssigned'+person).val(AmountShare.fullyAssigned);
        $('#splitPercentage'+person).val(AmountShare.splitPercentage);
        $('#splitAmount'+person).val(AmountShare.splitAmount);
        $('#fixedParameter'+person).val(AmountShare.fixedParameter);
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
    // calculate split
    this.update();
    // set fields to be required
    $("[id^='splitPercentage']").attr("required", true);
    $("[id^='splitAmount']").attr("required", true);
    // show detail split fields
    $('#otherSplitFields').collapse('show');
    scrollTo('#splitLabel');
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

        //Listen for split method selection
        $('#splitMethod1').change(function() {
            AmountSplitObj.setMethodEqually();
        });
        $('#splitMethod2').change(function() {
            AmountSplitObj.setMethodOther();
        });

    });
};