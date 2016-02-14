Template.header.helpers({
    heading: function () {
        var current = Session.get('currentQuiz'),
            quiz = Quizzes.findOne(current),
            title = (quiz) ? quiz.title : current.title;
        return (title) ? title : '';
    }
});
