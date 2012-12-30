if (Meteor.isClient) {
	Template.hello.greeting = function () {
		return "Welcome to colectionload.";
	};

	Template.hello.events({
			'click input' : function () {
				// template data, if any, is available in 'this'
				function callback(error,result) {
					if (error) {
						console.log('callback error:' + error);
						alert(_.values(error));
						console.log(_.values(error));
					} else {
						console.log('callback :' + result);
						var collection = new Meteor.Collection('Customers');
						console.log('local collection:' + collection.find().count());
						var query = collection.find({});
						var items = 0;
						query.observe({
								added: function (row) {
									items++;
									console.log('total items:' + items);
								}
						});
					}
				}

				Meteor.call('newCollection',callback);
			}
	});
	}

	if (Meteor.isServer) {
		var collection = null;
		Meteor.startup(function () {
			// code to run on server at startup
			Meteor.methods({
					newCollection: function() {
						if(!collection) {
						collection = new Meteor.Collection('Customers');
						collection.insert({Number: 1, First:'joe', Last:'blow', Username:'joe'});
						collection.insert({Number: 2, First:'jane', Last:'doe', Username:'jane'});
						collection.insert({Number: 3, First:'jim', Last:'johns', Username:'jim'});
						}
						console.log(collection.find().count());
						return(collection.find().count());
					}
			});
		});
		}
