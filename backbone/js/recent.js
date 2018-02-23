(function ($) {
  /*$.when(
    $.ajax({
        dataType: "json",
        url: "data.json"
    })
  ).done(function(json){
    //핸들바 템플릿을 가져온다.
    var source = $("#recent-prd").html();
    //핸들바 템플릿을 컴파일한다.
    var template = Handlebars.compile(source);
    //핸들바 템플릿에 데이터를 바인딩해서 HTML을 생성, HTML을 뿌려준다.
    $(template(json)).appendTo(".lately_product");
  });*/
  var history = Backbone.Model.extend({});
  var historyItems = Backbone.Collection.extend({
      model : history,
      url:'data.json'
  });
  var itemList = new historyItems();
  itemList.fetch();
  console.log(itemList);
  itemList.bind('reset', function () { console.log(itemList + 456); });
  /*var itemList = Backbone.View.extend({
    el: $('.lately_product'),
    initialize: function(){
      this.render();
    },
    render: function(){
      var that = this;
      var items = new historyItems();
    }
  });*/


})(jQuery);
