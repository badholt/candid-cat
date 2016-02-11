Problems = new Mongo.Collection("problems");
Quizzes = new Mongo.Collection("quizzes");
Reports = new Mongo.Collection("reports");

Meteor.users.deny({
    update: function () {
        return true;
    }
});
