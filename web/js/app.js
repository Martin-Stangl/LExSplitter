/**
 * Created by Martin on 04.01.2015.
 */


// Animated scroll to object with tag ID targetID
function scrollTo (targetID) {
    $('html, body').animate({scrollTop: $(targetID).offset().top}, 'slow');
}

// round to n decimal places
function round (number, places) {
    return +(Math.round(number + "e+" + places)  + "e-" + places);
}

/**
 * Created by Martin on 04.01.2015.
 *
 * Object Person
 */

function Person(personID) {
    this.personID = personID;
}
/**
 * Created by Martin on 04.01.2015.
 *
 * Object: List of persons
 */

function Persons() {
    this.persons = {};
}
/* =============================================================
 * bootstrap-combobox.js v1.1.6
 * =============================================================
 * Copyright 2012 Daniel Farrell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ) {

 "use strict";

 /* COMBOBOX PUBLIC CLASS DEFINITION
  * ================================ */

  var Combobox = function ( element, options ) {
    this.options = $.extend({}, $.fn.combobox.defaults, options);
    this.$source = $(element);
    this.$container = this.setup();
    this.$element = this.$container.find('input[type=text]');
    this.$target = this.$container.find('input[type=hidden]');
    this.$button = this.$container.find('.dropdown-toggle');
    this.$menu = $(this.options.menu).appendTo('body');
    this.template = this.options.template || this.template
    this.matcher = this.options.matcher || this.matcher;
    this.sorter = this.options.sorter || this.sorter;
    this.highlighter = this.options.highlighter || this.highlighter;
    this.shown = false;
    this.selected = false;
    this.refresh();
    this.transferAttributes();
    this.listen();
  };

  Combobox.prototype = {

    constructor: Combobox

  , setup: function () {
      var combobox = $(this.template());
      this.$source.before(combobox);
      this.$source.hide();
      return combobox;
    }

  , disable: function() {
      this.$element.prop('disabled', true);
      this.$button.attr('disabled', true);
      this.disabled = true;
      this.$container.addClass('combobox-disabled');
    }

  , enable: function() {
      this.$element.prop('disabled', false);
      this.$button.attr('disabled', false);
      this.disabled = false;
      this.$container.removeClass('combobox-disabled');
    }
  , parse: function () {
      var that = this
        , map = {}
        , source = []
        , selected = false
        , selectedValue = '';
      this.$source.find('option').each(function() {
        var option = $(this);
        if (option.val() === '') {
          that.options.placeholder = option.text();
          return;
        }
        map[option.text()] = option.val();
        source.push(option.text());
        if (option.prop('selected')) {
          selected = option.text();
          selectedValue = option.val();
        }
      })
      this.map = map;
      if (selected) {
        this.$element.val(selected);
        this.$target.val(selectedValue);
        this.$container.addClass('combobox-selected');
        this.selected = true;
      }
      return source;
    }

  , transferAttributes: function() {
    this.options.placeholder = this.$source.attr('data-placeholder') || this.options.placeholder
    this.$element.attr('placeholder', this.options.placeholder)
    this.$target.prop('name', this.$source.prop('name'))
    this.$target.val(this.$source.val())
    this.$source.removeAttr('name')  // Remove from source otherwise form will pass parameter twice.
    this.$element.attr('required', this.$source.attr('required'))
    this.$element.attr('rel', this.$source.attr('rel'))
    this.$element.attr('title', this.$source.attr('title'))
    this.$element.attr('class', this.$source.attr('class'))
    this.$element.attr('tabindex', this.$source.attr('tabindex'))
    this.$source.removeAttr('tabindex')
    if (this.$source.attr('disabled')!==undefined)
      this.disable();
  }

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value');
      this.$element.val(this.updater(val)).trigger('change');
      this.$target.val(this.map[val]).trigger('change');
      this.$source.val(this.map[val]).trigger('change');
      this.$container.addClass('combobox-selected');
      this.selected = true;
      return this.hide();
    }

  , updater: function (item) {
      return item;
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      });

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show();

      $('.dropdown-menu').on('mousedown', $.proxy(this.scrollSafety, this));

      this.shown = true;
      return this;
    }

  , hide: function () {
      this.$menu.hide();
      $('.dropdown-menu').off('mousedown', $.proxy(this.scrollSafety, this));
      this.$element.on('blur', $.proxy(this.blur, this));
      this.shown = false;
      return this;
    }

  , lookup: function (event) {
      this.query = this.$element.val();
      return this.process(this.source);
    }

  , process: function (items) {
      var that = this;

      items = $.grep(items, function (item) {
        return that.matcher(item);
      })

      items = this.sorter(items);

      if (!items.length) {
        return this.shown ? this.hide() : this;
      }

      return this.render(items.slice(0, this.options.items)).show();
    }

  , template: function() {
      if (this.options.bsVersion == '2') {
        return '<div class="combobox-container"><input type="hidden" /> <div class="input-append"> <input type="text" autocomplete="off" /> <span class="add-on dropdown-toggle" data-dropdown="dropdown"> <span class="caret"/> <i class="icon-remove"/> </span> </div> </div>'
      } else {
        return '<div class="combobox-container"> <input type="hidden" /> <div class="input-group"> <input type="text" autocomplete="off" /> <span class="input-group-addon dropdown-toggle" data-dropdown="dropdown"> <span class="caret" /> <span class="glyphicon glyphicon-remove" /> </span> </div> </div>'
      }
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase());
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item;

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) {beginswith.push(item);}
        else if (~item.indexOf(this.query)) {caseSensitive.push(item);}
        else {caseInsensitive.push(item);}
      }

      return beginswith.concat(caseSensitive, caseInsensitive);
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>';
      })
    }

  , render: function (items) {
      var that = this;

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item);
        i.find('a').html(that.highlighter(item));
        return i[0];
      })

      items.first().addClass('active');
      this.$menu.html(items);
      return this;
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next();

      if (!next.length) {
        next = $(this.$menu.find('li')[0]);
      }

      next.addClass('active');
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev();

      if (!prev.length) {
        prev = this.$menu.find('li').last();
      }

      prev.addClass('active');
    }

  , toggle: function () {
    if (!this.disabled) {
      if (this.$container.hasClass('combobox-selected')) {
        this.clearTarget();
        this.triggerChange();
        this.clearElement();
      } else {
        if (this.shown) {
          this.hide();
        } else {
          this.clearElement();
          this.lookup();
        }
      }
    }
  }

  , scrollSafety: function(e) {
      if (e.target.tagName == 'UL') {
          this.$element.off('blur');
      }
  }
  , clearElement: function () {
    this.$element.val('').focus();
  }

  , clearTarget: function () {
    this.$source.val('');
    this.$target.val('');
    this.$container.removeClass('combobox-selected');
    this.selected = false;
  }

  , triggerChange: function () {
    this.$source.trigger('change');
  }

  , refresh: function () {
    this.source = this.parse();
    this.options.items = this.source.length;
  }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this));

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this));
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this));

      this.$button
        .on('click', $.proxy(this.toggle, this));
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element;
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;');
        isSupported = typeof this.$element[eventName] === 'function';
      }
      return isSupported;
    }

  , move: function (e) {
      if (!this.shown) {return;}

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault();
          break;

        case 38: // up arrow
          e.preventDefault();
          this.prev();
          break;

        case 40: // down arrow
          e.preventDefault();
          this.next();
          break;
      }

      e.stopPropagation();
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27]);
      this.move(e);
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) {return;}
      this.move(e);
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 39: // right arrow
        case 38: // up arrow
        case 37: // left arrow
        case 36: // home
        case 35: // end
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break;

        case 9: // tab
        case 13: // enter
          if (!this.shown) {return;}
          this.select();
          break;

        case 27: // escape
          if (!this.shown) {return;}
          this.hide();
          break;

        default:
          this.clearTarget();
          this.lookup();
      }

      e.stopPropagation();
      e.preventDefault();
  }

  , focus: function (e) {
      this.focused = true;
    }

  , blur: function (e) {
      var that = this;
      this.focused = false;
      var val = this.$element.val();
      if (!this.selected && val !== '' ) {
        this.$element.val('');
        this.$source.val('').trigger('change');
        this.$target.val('').trigger('change');
      }
      if (!this.mousedover && this.shown) {setTimeout(function () { that.hide(); }, 200);}
    }

  , click: function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.select();
      this.$element.focus();
    }

  , mouseenter: function (e) {
      this.mousedover = true;
      this.$menu.find('.active').removeClass('active');
      $(e.currentTarget).addClass('active');
    }

  , mouseleave: function (e) {
      this.mousedover = false;
    }
  };

  /* COMBOBOX PLUGIN DEFINITION
   * =========================== */
  $.fn.combobox = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('combobox')
        , options = typeof option == 'object' && option;
      if(!data) {$this.data('combobox', (data = new Combobox(this, options)));}
      if (typeof option == 'string') {data[option]();}
    });
  };

  $.fn.combobox.defaults = {
    bsVersion: '3'
  , menu: '<ul class="typeahead typeahead-long dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  };

  $.fn.combobox.Constructor = Combobox;

}( window.jQuery );

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

/**
 * Created by Martin on 02.01.2015.
 */

// Animated scroll to object with tag ID targetID
function scrollTo (targetID) {
    $('html, body').animate({scrollTop: $(targetID).offset().top}, 'slow');
}

// round to n decimal places
function round (number, places) {
    return +(Math.round(number + "e+" + places)  + "e-" + places);
}



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

