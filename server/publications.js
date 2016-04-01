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
        /** Now, for author attribution, everyone's *public* profile information
         *  will be available to logged in users: */
        return Meteor.users.find({}, {
            fields: {
                "profile": 1
            }
        });
    } else {
        this.ready();
    }
});
