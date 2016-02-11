Template.home.onRendered(function () {
    $('.tabular.menu .item').tab('change tab', 'quizzes');
});

Template.quizList.helpers({
    quizzes: function () {
        return Quizzes.find();
    }
});

Template.quizList.events({
    "click .take-quiz": function (){
        Session.set('currentQuiz', this._id);
        Session.set('questionNumber', 0);
        Session.set('report', '');
        Router.go('/play/' + this._id);
    }
});
