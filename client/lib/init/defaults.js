Meteor.startup(function () {
    Session.setDefault('answered', false);
    Session.setDefault('currentQuiz', '');
    Session.setDefault('questionNumber', 0);
    Session.setDefault('report', '');
    Session.setDefault('signUp', false);

    Transitioner.default({
        in: 'transition.slideLeftIn',
        out: 'transition.perspectiveLeftOut'
    });
});
