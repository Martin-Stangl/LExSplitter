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