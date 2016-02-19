var timer;

Template.answer.onRendered(function () {
    var answerBox = $('#selected-code');
    answerBox.text(Session.get('answered'));
    hljs.highlightBlock(answerBox[0]);
});

Template.play.events({
    "click #nextQuestion": function (event) {
        var accuracy = [],
            answerBox = $('#selected-code'),
            answers = [],
            checklist = this.answers.slice(0),
            report,
            selected = answerBox.text().match(/<[^> ]+[^>]*>[^<]*/g),
            time = timer.getTime().time;
        _.each(selected, function (response) {
            var correct = false;
            for (var i in this.answers) {
                if (this.answers.hasOwnProperty(i)) {
                    var answer = this.answers[i];
                    if (!correct) {//if the answer has already been matched, don't bother
                        if (typeof answer === 'string') {//if it's mandatory
                            correct = (answer == response);
                        } else {//if it's optional
                            correct = _.contains(answer, response);
                        }
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
            answers.push(response);
        }, this);//All correct values have been checked off
        _.each(_.compact(checklist), function () {//if some answers haven't been checked
            accuracy.push(false);//mark the lack of answer as false
            answers.push(null);
        });
        if (answers.length > 0) {
            report = {
                accuracy: accuracy,
                answers: answers,
                time: time
            };
            Meteor.call('reportUserResponse', report, this._id);
            var next = Session.get('questionNumber') + 1;
            $('#quizProgress').progress('increment');
            if (next < Quizzes.findOne(Session.get('currentQuiz')).questions.length) {
                var codePrompt = $('#code-prompt');
                //codePrompt.empty().removeClass();
                Session.set('running', false);
                Session.set('questionNumber', next);
                Session.set('answered', false);
            } else {
                Router.go('home');
                //Session.set('currentQuiz', '');
            }
        }
    },
    "click code > span": function (event) {
        var target = $(event.target),
            targetClass = target.context.className,
            selected = (targetClass != 'hljs-tag' && targetClass != 'hljs-keyword') ? target.parent() : target,
            tag = selected.clone().wrap('<p>').parent().html();
        Session.set('answered', $(tag).text());
        var answerBox = $('#selected-code');
        if (answerBox[0]) {
            if (!answerBox.html().includes(tag)) {
                answerBox.text(answerBox.text() + $(tag).text());
                hljs.highlightBlock(answerBox[0]);
            }
        }
    },
    "click #selected-code > span": function (event) {
        var answerBox = $('#selected-code');
        if (answerBox[0]) {
            var target = $(event.target),
                targetClass = target.context.className,
                selected = (targetClass != 'hljs-tag' && targetClass != 'hljs-keyword') ? target.parent() : target,
                tag = selected.clone().wrap('<p>').parent().html();
            answerBox.text(answerBox.text().replace($(tag).text(), ''));
            if (answerBox.text() != '') {
                hljs.highlightBlock(answerBox[0]);
            } else {
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

Template.find.onRendered(function () {
    Session.set("answered", false);
    this.$('#selected-code').text("");
    timer = $('#timer').FlipClock({
        clockFace: 'MinuteCounter'
    });
    var codePrompt = $('#code-prompt-' + this.data.number),
        language = (this.data.language === 'htmlmixed') ? 'language-html' : this.data.language;
    hljs.highlightBlock(codePrompt[0]);
});
