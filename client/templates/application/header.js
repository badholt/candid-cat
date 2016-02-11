Template.header.helpers({
    heading: function () {
        var value = Session.get('currentQuiz'),
            quiz = Quizzes.find(value).fetch();
        return (quiz[0]) ? quiz[0].title : value;
    }
});
