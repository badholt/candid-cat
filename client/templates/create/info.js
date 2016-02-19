Template.infoPage.events({
    "keyup input[name='title']": function (event) {
        var id = Session.get('currentQuiz');
        Meteor.call('updateQuiz', id, Quizzes.findOne(id).organization, [], event.target.value);
    },
    "keyup input[name='org']": function (event) {
        var id = Session.get('currentQuiz');
        Meteor.call('updateQuiz', id, event.target.value, [], Quizzes.findOne(id).title);
    }
});
