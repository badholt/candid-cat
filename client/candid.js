Template.home.onRendered(function () {
    var id = Session.get('currentQuiz');
    if (id) {
        $('.tabular.menu .item').tab('change tab', 'scores');
        var quiz = Quizzes.findOne(id);
        Session.set('quizSelected', quiz);
        $('#quizSelection').dropdown('set selected', (quiz) ? quiz.title : '');
    } else {
        $('.tabular.menu .item').tab();
    }
});

Template.quizList.helpers({
    myQuizzes: function () {
        return Quizzes.find({owner: Meteor.userId()});
    },
    quizzes: function () {
        return Quizzes.find();
    }
});

Template.quizList.events({
    "click #add-quiz": function () {
        event.preventDefault();
        Session.set('questionNumber', -1);
        Router.go('create');
    },
    "click .edit-quiz": function () {
        Session.set('currentQuiz', this._id);
        Router.go('/create');
    },
    "click .take-quiz": function () {
        Session.set('currentQuiz', this._id);
        Session.set('questionNumber', 0);
        Session.set('report', '');
        Router.go('/play/' + this._id);
    }
});
