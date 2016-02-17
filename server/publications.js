Meteor.publish("problems", function () {
    return Problems.find();
});

Meteor.publish("quizzes", function () {
    return Quizzes.find();
});

Meteor.publish("reports", function () {
    return Reports.find({
        user: this.userId
    });
});

Meteor.publish("users", function () {
    var currentUser = this.userId;
    if (currentUser) {
        return Meteor.users.find({_id: currentUser}, {
            fields: {
                "profile": 1
            }
        });
    } else {
        this.ready();
    }
});
