Template.creator.events({
    'click #addQuestion': function (event) {
        var id = this._id,
            quiz = Quizzes.findOne(id),
            problem = {
                answers: [],
                code: '',
                created: new Date(),
                difficulty: '',
                owner: Meteor.userId(),
                language: '',
                number: quiz.questions.length,
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
        var problem = Problems.findOne(this.question._id);
        problem['type'] = $(event.target)
            .closest('.button').context.innerText.replace(' ', '');
        Meteor.call('updateProblem', problem);
        $('#question-' + this.question.number + '-type').accordion('close', 0);
        $('#question-' + this.question.number).transition('horizontal flip in');
    }
});

Template.creator.helpers({
    newQuestions: function () {
        return _.map(this.questions, function (value) {
            return {_id: value};
        });
    }
});

Template.creator.onRendered(function () {
    if (!Session.get('currentQuiz')) {
        Meteor.call('addQuiz', [], '', '', function (error, result) {
            Session.set('currentQuiz', result);
        });
    }
});

Template.infoPage.events({
    "keyup input[name='title']": function (event) {
        var id = Session.get('currentQuiz');
        Meteor.call('updateQuiz', id, Quizzes.findOne(id).organization, [], event.target.value);
    },
    "keyup input[name='org']": function (event) {
        var id = Session.get('currentQuiz');
        Meteor.call('updateQuiz', id, event.target.value, [], Quizzes.findOne(id).title);
    }
});

Template.creator.helpers({
    quiz: function () {
        return Quizzes.findOne(Session.get('currentQuiz'));
    }
});

Template.questionPage.events({
    "keyup textarea[name='text-prompt']": function (event) {
        this.question['prompt'] = event.target.value;
        Meteor.call('updateProblem', this.question);
    }
});

Template.questionPage.helpers({
    question: function () {
        return Problems.findOne(this._id);
    }
});

Template.questionTab.helpers({
    number: function () {
        return Problems.findOne(this._id).number;
    }
});

Template.questionTab.onRendered(function () {
    $('.tabular.menu .item').tab('change tab', Problems.findOne(this.data._id).number);
});

Template.questionTypeSelector.onRendered(function () {
    $('#question-' + this.data.question.number + '-type').accordion('open', 0);
});

Template.submissionRow.events({
    'click .difficulty .button': function (event) {
        console.log(this);
        this.question['difficulty'] = $(event.target).attr('data-value');
        Meteor.call('updateProblem', this.question);
    },
    'click #submitQuestions': function (event) {
        Router.go('home');
        Session.set('currentQuiz', '');
    }
});
