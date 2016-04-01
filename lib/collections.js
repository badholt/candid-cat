Problems = new Mongo.Collection("problems");
Quizzes = new Mongo.Collection("quizzes");
Reports = new Mongo.Collection("reports");

Meteor.users.deny({
    update: function () {
        return true;
    }
});

Problems.helpers({
    typeCount: function () {
      // console.log(this);
    },
    report: function () {
        return Reports.findOne({problem: this._id, user: Meteor.userId()})
    }
});

Quizzes.helpers({
    author: function () {
        return Meteor.users.findOne(this.owner).profile;
    },
    problem: function () {
        return Problems.findOne(this.questions[Session.get('questionNumber')]);
    },
    problems: function () {
        return Problems.find({_id: {$in: this.questions}}, {sort: {number: 1}});
    },
    selectedQuestions: function (numbers) {
        var quiz = this;
        var questions = quiz.questions;
        if (! _.contains(numbers, "default")) {
            questions = _.map(numbers, function (number) {
                return quiz.questions[number];
            });
        }
        return questions;
    }
});
