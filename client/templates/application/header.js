Template.header.helpers({
    heading: function () {
        var current = Session.get('currentQuiz');
        return (_.isObject(current)) ? current.title : Quizzes.findOne(current).title;
    }
});
