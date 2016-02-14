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
        var question = Session.get('report');
        question[this.number]['type'] = $(event.target)
            .closest('.button').context.innerText.replace(' ', '');
        Session.set('report', question);
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

Template.questionPage.helpers({
    question: function () {
        return Session.get('report')[this.number];
    }
});

Template.questionPage.onRendered(function () {
    var number = Session.get('questionNumber'),
        question = Session.get('report');
    console.log(question);
    question = (question) ? question : [];
    console.log(question);
    question.push(
        {
            answers: [],
            code: '',
            created: new Date(),
            difficulty: '',
            owner: Meteor.userId(),
            language: '',
            number: number,
            prompt: '',
            type: ''
        }
    );
    console.log(question);
    Session.set('report', question);
});

Template.questionTab.onRendered(function () {
    $('.tabular.menu .item').tab('change tab', Session.get('questionNumber').toString());
});

Template.questionTypeSelector.onRendered(function () {
    $('#question-' + this.data.number + '-type').accordion('open', 0);
});

Template.submissionRow.events({
    'click .difficulty .button': function (event) {
        var question = Session.get('report');
        question[this.number]['difficulty'] = $(event.target).attr('data-value');
        Session.set('report', question);
    }
});
