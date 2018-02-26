/*----------------------------------------------------------*/
/* Handlebars                                               */
/*----------------------------------------------------------*/
Handlebars.registerPartial("template-product", $("#template-product").html());
Handlebars.registerPartial("template-label", $("#template-label").html());
Handlebars.registerHelper('if-compare', function (compare, func, options) {
  var myCompare = eval(compare),
      myFunc;

  if (options == NaN || options == null || options == undefined) {
    options = func;
  } else {
    myFunc = func;
  };

  if (myCompare) {
    eval(myFunc);
    return options.fn(this);
  } else {
    return options.inverse(this);
  };
});

/*----------------------------------------------------------*/
/* function                                                 */
/*----------------------------------------------------------*/
function updateTotal(num) {
  $('.piece_total .num').html(num);
};
function emptyItem() {
  $('.box_option').hide();
  $('.lately_product').hide();
  $('.box_zm').show();
};

/*----------------------------------------------------------*/
/* Backbone                                                 */
/*----------------------------------------------------------*/
var HistoryItem = Backbone.Model.extend({
  defaults: {
    "date" : null,
    "historyData" : null
  }
});
var HistoryItems = Backbone.Collection.extend({
  model : HistoryItem,
  url : 'json/recentview.json',
  parse : function (response) {
    this.total = response.length;

    return this.dataRange(response);
  },
  dataRange : function (response) {
    var tempData = [],
        num = 0;

    response.forEach(function (source) {
      var sourceDate = source.insertDate.slice(2,4) + '.' + source.insertDate.slice(4,6);

      if (tempData[num] == null && num == 0) {
        tempData[num] = {date : null, historyData : []};
        tempData[num].date = sourceDate;
        tempData[num].historyData.unshift(source);
      } else {
        if (tempData[num].date == sourceDate) {
          tempData[num].historyData.unshift(source);
        } else {
          tempData[++num] = {date : null, historyData : []};
          tempData[num].date = sourceDate;
          tempData[num].historyData.unshift(source);
        };
      };
    });
    return tempData;
  }
});
var HistoryItemView = Backbone.View.extend({
  model : HistoryItem,
  template : Handlebars.compile($('#template-days').html()),
  className : 'item_lately',
  events : {
    'click .btn_del' : 'clear',
    'click .btn_choice' : 'like'
  },
  initialize : function () {
    this.render();
  },
  render : function () {
    var source = this.model.toJSON();

    this.$el.html(this.template(source));
  },
  clear : function (e) {
    var collection = this.model.collection;
    var index = $(e.currentTarget).parents('li').index(),
        modelAttr = this.model.attributes.historyData;

    modelAttr.splice(index, 1);

    if(modelAttr.length == 0) {
      this.remove();
      collection.remove(this.model);
    } else {
      this.render();
    };

    // JSON.stringify(collection)

    updateTotal(--collection.total);

    if (collection.total == 0) {
      emptyItem();
    };
  },
  like : function (e) {
    var $btnlike = $(e.currentTarget),
        $badge = $('.like_regi');

    var state = $btnlike.hasClass('selected'),
        badgeText;

    if(state) {
      $badge.addClass('like_cancel');
      $btnlike.removeClass('selected');

      badgeText = '<div class="ly_msgct"><p>ì‡¼í•‘ì°œ<br>ì·¨ì†Œ!</p>';
    } else {
      $badge.removeClass('like_cancel');
      $btnlike.addClass('selected')

      badgeText = '<div class="ly_msgct"><p>ì‡¼í•‘ì°œ<br>ë“±ë¡!</p>';
    };

    $badge.find('.ly_msgwrap').html(badgeText);
    $badge.show().stop(true).animate({opacity : 1}, 500, function () {
      $(this).stop(true).delay(500).animate({opacity : 0}, 500, function () {
        $(this).hide();
      });
    });

  }
});
var HistoryItemsView = Backbone.View.extend({
  collection : HistoryItem,
  className  : 'lately_product',
  initialize : function () {
    this.render();
  },
  render : function () {
    this.collection.forEach(function (source, index) {
      var historyItemView = new HistoryItemView({model : source});

      this.$el.prepend(historyItemView.el);
    }, this);
  }
});

/*----------------------------------------------------------*/
var historyItems = new HistoryItems();
historyItems.fetch({
  success : function () {
    var total = historyItems.total;

    if (total != 0) {
      var historyItemsView = new HistoryItemsView({collection : historyItems});
      $('.wrap_lately').append(historyItemsView.el);
    } else {
      emptyItem();
    };

    updateTotal(total);
  },
  error : function () {
    $('.error_wrap').show();
  }
}).done(function () {
  $('.spinner').hide();
});
