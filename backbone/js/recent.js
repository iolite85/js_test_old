(function ($) {

	var history = Backbone.Model.extend();
	var historyItems = Backbone.Collection.extend({
		  model : history,
		  url:'data.json'
	});

	var itemList = Backbone.View.extend({
		el: $('.lately_product'),
		template: Handlebars.compile($("#recent-prd-group").html()),
		initialize: function(){
			var self = this;
			this.collection = new historyItems();
			this.collection.fetch({
				success: function(){
					console.log('json loaded');
					self.render();
				},
				error: function(){
					console.log('json load error');
				}
			});
		},
		getGroups: function(){
			var groups = [];
			var temp = this.collection.toJSON();
			var groupBy = _.groupBy(temp, 'insertDate');
			_.each(groupBy, function(list, date){
				var standard = Number(date);
				var date = date.substring(2,4) + '.' + date.substring(4,6);
				groups.push({standard, date, list: list});
			});
			groups = _.sortBy(groups, function(data) {
				return -data.standard;
			});
			return groups;
		},
		getCount: function(){
			var count = $('.lately_product').find('.list_chu_prod li').length;
			return count;
		},
		helper: function(){
			Handlebars.registerHelper('state', function(contentCondition) {
				if(this.contentCondition === "S"){
					return 'sold_out';
				}else if(this.contentCondition === "I"){
					return 'sell_end';
				}
			});

			Handlebars.registerHelper('isContentCondition', function(options) {
				if(this.contentCondition === "S"){
					return options.fn(this);
				}else if(this.contentCondition === "I"){
					return options.inverse(this);
				}
			});
		},
		render: function(){
			//Item grouping
			var group = this.getGroups();

			//Handlebars Helper
			this.helper();

			//Handlebars partial Templeate
			var tpl = $("#recent-prd").html();
			Handlebars.registerPartial("item", tpl);

			// HTML 생성
			this.$el.append(this.template({groups: group}));

			//Item Total Count
			$('.wrap_lately .piece_total .num').text(this.getCount());
			//console.log(group);
			return this;


		}
	});

	var items = new itemList();
	//console.log(items);

	/* test

	$.when(
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
	});

	// 부분템플릿
	$.when(
		$.ajax({
			dataType: "json",
			url: "data.json"
		})
	).done(function(json){
		//핸들바 템플릿을 가져온다.
		var source = $("#recent-prd").html();
		//핸들바 템플릿을 컴파일한다.
		var template = Handlebars.compile($("#recent-prd-group").html());
		Handlebars.registerPartial("item", source);
		//핸들바 템플릿에 데이터를 바인딩해서 HTML을 생성, HTML을 뿌려준다.
		$(template(json)).appendTo(".lately_product");
	});


	var history = Backbone.Model.extend();
	var historyItems = Backbone.Collection.extend({
		  model : history,
		  url:'data.json'
	});
	var itemList = Backbone.View.extend({
		el: $('.lately_product'),
		template: Handlebars.compile($("#recent-prd").html()),
		render: function() {
			var data = { items: historys.models.map(function(x) { return x.toJSON(); }) };
			this.$el.append(this.template(data));
			return this;
		}
	});

	var historys = new historyItems();
	var items = new itemList({model: historys});
	historys.fetch({
		success: function(){
			console.log('json loaded');
			items.render();
		},
		error: function () {
		  console.log('json load error');
		}
	});
	*/

})(jQuery);
