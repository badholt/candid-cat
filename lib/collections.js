Problems = new Mongo.Collection("problems");
Quizzes = new Mongo.Collection("quizzes");
Reports = new Mongo.Collection("reports");

Meteor.users.deny({
    update: function () {
        return true;
    }
});

Quizzes.helpers({
    problem: function () {
        return Problems.findOne(this.questions[Session.get('questionNumber')]);
    },
    problems: function () {
        return Problems.find({_id: {$in: this.questions}}, {sort: {number: 1}});
    }
});
