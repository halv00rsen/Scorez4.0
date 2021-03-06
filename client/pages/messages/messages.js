
Template.messages.helpers({
	get_invites: function() {
		return User_messages.find({
			// type: "invite"
		}, {
			sort: {createdAt: -1}
		});
		// console.log("heisanndu");
		// var messages = User_messages.find().fetch();
		// var invites = [];
		// for (var i in messages) {
		// 	if (messages[i].type === "invite"){
		// 		invites.push(messages[i]);
		// 	}
		// }
		// return invites;
	},

	get_chat_messages: function() {
		return Groups.find({
			"chat_messages": { $exists: true, $ne: null }
		});
	},

	get_read_class: function(is_read) {
		if (!is_read)
			return "not_read";
		else
			return "";
	},
	is_invite: function() {
		return this.type === "invite";
	}
});


Template.messages.events({
	"click .choose_value": function(event, template) {
		var value = event.target.name;
		var id = event.target.parentElement.parentElement.id;
		if (value === "yes" || value === "no") {
			Meteor.call("answer_on_invite", {
				join: value === "yes",
				invite_id: id
			}, function(error, result) {
				if (error) {
					Show_message(error.reason);
				} else {

				}
			});
		} else {
			Show_message("Please do not edit the html.");
		}
	}
});
