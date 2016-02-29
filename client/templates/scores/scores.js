Template.accuracyBar.onRendered(function () {
    $('#accuracy').progress({
        text: {
            active: '{value} of {total}',
            success: 'Perfect Score! ({value} of {total})'
        }
    });
});

Template.dataDisplay.events({
    'click #takeQuiz': function () {
        Session.set('currentQuiz', this._id);
        Session.set('questionNumber', 0);
        Session.set('report', '');
        Router.go('/play/' + this._id);
        //console.log(Template.instance().selectedProblems.get());
    }
});

Template.dataDisplay.helpers({
    calculations: function () {
        var misses = [],
            number = Session.get('questionNumber').toString().split(','),
            numbers = [],
            questions = (number) ? this.selectedQuestions(number) : this.questions,
            times = [],
            totalCorrect = 0,
            totalAttempts = 0;

        _.each(questions, function (id) {
            var question = Problems.findOne(id);
            var report = Reports.findOne({"problem": id});
            if (report) {
                for (var i in report.accuracy) {
                    if (report.accuracy.hasOwnProperty(i)) {
                        var incorrect = _.contains(report.accuracy[i], false);
                        if (!incorrect) {
                            totalCorrect++;
                        } else {
                            misses.push({
                                answer: question.answers,
                                number: question.number,
                                response: report.answers[i],
                                type: question.type
                            });
                        }
                    }
                    totalAttempts++;
                }
                numbers.push({number: question.number});
                times.push(report.times);
            }
        });

        return (totalAttempts != 0) ? {
            correct: totalCorrect,
            misses: misses,
            numbers: numbers,
            percent: Math.round((totalCorrect / totalAttempts) * 100),
            quiz: this.title,
            times: times,
            total: totalAttempts
        } : '';
    },
    difficulty: function () {
        var number = Session.get('questionNumber'),
            problem = Problems.findOne(this.questions[number]);
        return (problem) ? problem.difficulty : ''; //currently only good for Question 0
    },
    statistics: function () {
        var numbers = Session.get('questionNumber').toString().split(','),
            problems = Quizzes.findOne(Session.get('quizSelected')).selectedQuestions(numbers);
        var selectedTimes = _.flatten(Problems.find({_id: {$in: problems}}).map(function (problem) {
            return problem.report().times;
        }));
        return [{
            color: 'green',
            label: 'fastest answer (seconds)',
            statistic: _.min(selectedTimes)
        }, {
            color: 'red',
            label: 'slowest answer (seconds)',
            statistic: _.max(selectedTimes)
        }];
    },
    taken: function () {
        console.log(this);
    }
});

Template.missList.onRendered(function () {
    $('.table').tablesort();
});

Template.questionsDropdown.onRendered(function () {
    $('#questions-selection').dropdown({
        onChange: function (value, element) {
            Session.set('questionNumber', value);
        }
    }).dropdown('set selected', 'default');
    console.log(this.data);
});

Template.quizDropdown.helpers({
    quizzes: function () {
        return Quizzes.find();
    }
});

Template.quizDropdown.onRendered(function () {
    $('#quiz-selection').dropdown({
        onChange: function () {
            $('.dropdown').dropdown({
                onChange: function () {
                    $('#questions-selection').dropdown({
                        onChange: function (value, element) {
                            Session.set('questionNumber', value);
                        }
                    }).dropdown('set selected', 'default');
                }
            });
        }
    }).dropdown('set selected', 'default');
});

Template.quizDropdownItem.events({
    "click .item": function (event, template) {
        Session.set('quizSelected', this._id);
    }
});

Template.scores.helpers({
    selection: function () {
        return Quizzes.findOne(Session.get('quizSelected'));
    },
    showCharts: function () {
        return Template.instance().showCharts.get();
    }
});

Template.quizDropdown.onCreated(function () {
    this.quizSelection = new ReactiveVar('');
});
