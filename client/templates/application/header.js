Template.header.helpers({
    heading: function () {
        var id = Session.get('currentQuiz'),
            quiz = Quizzes.find(id).fetch();
        return (quiz) ? quiz.title : id;
    }
});
