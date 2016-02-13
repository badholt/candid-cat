Template.home.onRendered(function () {
    var id = Session.get('currentQuiz');
    if (id) {
        $('.tabular.menu .item').tab('change tab', 'scores');
        var quiz = Quizzes.findOne(id);
        Session.set('quizSelected', quiz);
        $('#quizSelection').dropdown('set selected', quiz.title);
        Session.set('currentQuiz', '');
    } else {
        $('.tabular.menu .item').tab();
    }
});

Template.quizList.helpers({
    quizzes: function () {
        return Quizzes.find();
    }
});

Template.quizList.events({
    "click .take-quiz": function () {
        Session.set('currentQuiz', this._id);
        Session.set('questionNumber', 0);
        Session.set('report', '');
        Router.go('/play/' + this._id);
    }
});
