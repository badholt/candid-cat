Template.header.helpers({
    heading: function () {
        var current = Session.get('currentQuiz'),
            quiz = Quizzes.findOne(current);
        return (quiz) ? quiz.title : '';
    }
});

Template.currentUser.events({
    'click #logout': function (event, template) {
        Meteor.logout();
    }
});

Template.currentUser.onRendered(function () {
    $('.ui.dropdown').dropdown();
});

Template.mobileNavigationDropdown.onRendered(function () {
    $('.mobile-navigation').dropdown({
        onShow: function () {
            $('.mobile-navigation .tab.item').tab();
        }
    });
});
