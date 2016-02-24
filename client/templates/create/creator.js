Template.creator.events({
    'click #addQuestion': function (event) {
        var id = this._id,
            quiz = Quizzes.findOne(id),
            problem = {
                answers: [],
                code: '',
                created: new Date(),
                difficulty: '',
                language: '',
                multipleChoices: [],
                number: quiz.questions.length,
                owner: Meteor.userId(),
                prompt: '',
                type: ''
            };
        Meteor.call('addProblem', problem, function (error, result) {
            if (!error) {
                Meteor.call('updateQuiz', id, quiz.organization, [result], quiz.title);
            }
        });
    },
    'click .question-type': function (event) {
        this.type = $(event.target)
            .closest('.button').context.innerText.replace(' ', '');
        if (this.type === 'knowledge' && this.multipleChoices.length === 0) {
            this.multipleChoices.push({
                number: 1,
                text: '',
                truth: false,
                type: 'checkbox'
            });
        }
        Meteor.call('updateProblem', this);
        $('#question-' + this.number + '-type').accordion('close', 0);
        $('#question-' + this.number).transition('horizontal flip in');
    }
});

Template.creator.onRendered(function () {
    if (!Session.get('currentQuiz')) {
        Meteor.call('addQuiz', [], '', '', function (error, result) {
            Session.set('currentQuiz', result);
        });
    }
});

Template.creator.helpers({
    quiz: function () {
        return Quizzes.findOne(Session.get('currentQuiz'));
    }
});

Template.questionPage.events({
    "keyup textarea[name='text-prompt']": function (event) {
        this.prompt = event.target.value;
        Meteor.call('updateProblem', this);
    }
});

Template.questionTab.onRendered(function () {
    $('.ui.tabular.menu .item').tab('change tab', this.data.number);
});

Template.questionTypeSelector.onRendered(function () {
    if (!this.data.type) {
        $('#question-' + this.data.number + '-type').accordion('open', 0);
    } else {
        $('#question-' + this.data.number + '-type').accordion();
    }
});

Template.submissionRow.events({
    'click .difficulty .button': function (event) {
        this.difficulty = $(event.target).attr('data-value');
        Meteor.call('updateProblem', this);
    },
    'click #submitQuestions': function (event) {
        Router.go('home');
        Session.set('currentQuiz', '');
    }
});

Template.submissionRow.helpers({
    last: function () {
        var quiz = Quizzes.findOne(Session.get('currentQuiz')),
            length = quiz && quiz.questions && quiz.questions.length;
        return this.number === length - 1;
    }
});
