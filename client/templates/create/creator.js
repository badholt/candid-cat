Template.creatorLaunch.events({
    'submit #launchCreator': function (event) {
        event.preventDefault();
        var values = $('.ui.form').form('get values');
        Session.set('currentQuiz', {
            aware: true,
            creationDate: new Date(),
            owner: values.org,
            questions: [],
            title: values.title
        });
        Session.set('questionNumber', 0);
        Router.go('create');
    }
});

Template.creator.events({
    'click #addQuestion': function (event) {
        var number = Session.get('questionNumber') + 1;
        Session.set('questionNumber', number);
    },
    'click .question-type': function (event) {
        $('#question-' + this.number + '-type').accordion('close', 0);
        $('#question-' + this.number).transition('horizontal flip in');
    }
});

Template.creator.helpers({
    newQuestions: function () {
        return _.map(_.range(Session.get('questionNumber') + 1), function (number) {
            return {number: number};
        });
    }
});

Template.questionTab.onRendered(function () {
    $('.tabular.menu .item').tab('change tab', Session.get('questionNumber').toString());
});

Template.questionTypeSelector.onRendered(function () {
    $('#question-' + this.data.number + '-type').accordion('open', 0);
});
