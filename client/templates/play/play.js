var timer;

Template.answer.onRendered(function () {
    var answerBox = $('#selected-code');
    answerBox.text(Session.get('answered'));
    hljs.highlightBlock(answerBox[0]);
    answerBox.contents().filter(function () {
        return this.nodeType === 3
    }).wrap('<span class="variable-name"></span>');
});

Template.play.events({
    "click #nextQuestion": function (event, template) {
        var accuracy = [],
            checklist = this.answers.slice(0),
            options = [],
            problemType = this.type,
            report,
            responses = [],
            time = timer.getTime().time;
        if (problemType === 'knowledge') {
            $('.checkbox').each(function (value) {
                var checkbox = $(this),
                    response = checkbox.find('input').attr('data-value');
                if (checkbox.checkbox('is checked')) {
                    options.push(response);
                }
            });
        } else if (problemType === 'find') {
            var answerBox = $('#selected-code');
            options = answerBox.children();
        }
        _.each(options, function (response) {
            var correct = false;
            if (problemType === 'find') response = $(response).text();
            for (var i in this.answers) {
                if (this.answers.hasOwnProperty(i)) {
                    var answer = this.answers[i];
                    if (!correct) {//if the answer has already been matched, don't bother
                        if (typeof answer === 'string' || typeof answer === 'number') {//if it's mandatory
                            correct = (answer == response);
                        } else {//if it's optional
                            correct = _.contains(answer, response);
                        }
                        console.log(response, answer, correct);
                        if (correct) {//if correct
                            var index = checklist.indexOf(answer);//check it off checklist
                            if (index != -1) {
                                checklist[index] = null;
                                accuracy.push(correct);
                            }//as long as it's present (not already removed)
                        }
                    }
                }
            }
            if (!correct) {//if none of the answers matched the response
                accuracy.push(false);
            }
            responses.push(response);
        }, this);//All correct values have been checked off
        if (problemType === 'find') {
            _.each(_.compact(checklist), function () {//if some answers haven't been checked
                accuracy.push(false);//mark the lack of answer as false
                responses.push(null);
            });
        }
        if (responses.length > 0) {
            report = {
                accuracy: accuracy,
                answers: responses,
                time: time
            };
            Meteor.call('reportUserResponse', report, this._id);
            var next = Session.get('questionNumber') + 1;
            $('#quizProgress').progress('increment');
            if (next < Quizzes.findOne(Session.get('currentQuiz')).questions.length) {
                Session.set('running', false);
                Session.set('questionNumber', next);
                Session.set('answered', false);
            } else {
                //Router.go('home');
            }
        }
    },
    "click code > span": function (event) {
        var target = $(event.target),
            targetClass = target.context.className,
            selected = (targetClass !== 'hljs-title') ? target : target.parent(),
            tag = selected.clone().wrap('<p>').parent().html();
        Session.set('answered', $(tag).text());
        var answerBox = $('#selected-code');
        if (answerBox[0]) {
            if (!answerBox.html().includes(tag)) {
                answerBox.append(tag);
            }
        }
    },
    "click #selected-code > span": function (event) {
        var answerBox = $('#selected-code');
        if (answerBox[0]) {
            var target = $(event.target),
                targetClass = target.context.className,
                selected = (targetClass !== 'hljs-title') ? target : target.parent(),
                tag = selected.clone().wrap('<p>').parent().html();
            _.each(answerBox.children(), function (child) {
                if ($(child).text() === $(tag).text()) {
                    child.remove();
                }
            });
            if (answerBox.text() === '') {
                Session.set('answered', false);
            }
        }
    }
});

Template.play.helpers({
    aware: function () {
        return Quizzes.findOne(Session.get('currentQuiz')).aware;
    },
    problem: function () {
        var quiz = Quizzes.findOne(Session.get('currentQuiz'));
        return (quiz) ? quiz.problem() : '';
    },
    problems: function () {
        var quiz = Quizzes.findOne(Session.get('currentQuiz'));
        return (quiz) ? quiz.problems() : '';
    },
    timer: function () {
        return timer.getTime();
    }
});

Template.problemTimer.onRendered(function () {
    timer = $('#timer').FlipClock({
        clockFace: 'MinuteCounter'
    });
});
