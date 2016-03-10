Template.header.helpers({
    heading: function () {
        var current = Session.get('currentQuiz'),
            quiz = Quizzes.findOne(current);
        return (quiz) ? quiz.title : '';
    }
});

Template.mobileNavigationDropdown.onRendered(function () {
    $('.mobile-navigation').dropdown({
        onShow: function () {
            $('.mobile-navigation .tab.item').tab();
        }
    });
});
