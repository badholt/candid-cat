Template.header.helpers({
    heading: function () {
        var current = Session.get('currentQuiz'),
            quiz = Quizzes.findOne(current);
        return (quiz) ? quiz.title : '';
    }
});
