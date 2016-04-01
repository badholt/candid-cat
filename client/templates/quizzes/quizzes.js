Template.chartCanvas.onRendered(function () {
    var context;
    if (this.data.id !== 'pie-chart') {
        context = document.getElementById('radar-chart').getContext('2d');
        var radarChart = new Chart(context).Radar({
            labels: ["Knowledge", "Find", "Fix", "Output"],
            datasets: [
                {
                    label: "Percent Correct",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81]
                },
                {
                    label: "Group Average",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        });
    } else {
        context = document.getElementById('pie-chart').getContext('2d');
        var numbers = Session.get('questionNumber').toString().split(','),
            quiz = Quizzes.findOne(Session.get('quizSelected')),
            ids = quiz.selectedQuestions(numbers),
            problems = Problems.find({_id: {$in: ids}}, {fields: {type: 1}}).map(function (problem) {
                return problem.type;
            }),
            types = _.countBy(problems, function (value) {
                if (value === 'knowledge') {
                    return 'knowledge';
                } else if (value === 'find') {
                    return 'find';
                }
            });
        // console.log(ids.length, types);
        var pieChart = new Chart(context).Pie([
            {
                value: (types.find) ? types.find : 0,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "find"
            },
            {
                value: (types.knowledge) ? types.knowledge : 0,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "knowledge"
            }
        ]);
    }
});

Template.home.onRendered(function () {
    Session.set('questionNumber', 'default');
    var id = Session.get('currentQuiz');
    if (id) {
        $('.tabular.menu .item').tab('change tab', 'scores');
        var quiz = Quizzes.findOne(id);
        Session.set('quizSelected', quiz);
        $('#quizSelection').dropdown('set selected', (quiz) ? quiz.title : 'default');
    } else {
        $('.tabular.menu .item').tab();
    }
});

Template.quizList.helpers({
    myQuizzes: function () {
        return Quizzes.find({owner: Meteor.userId()});
    },
    quizzes: function () {
        return Quizzes.find();
    }
});

Template.quizList.events({
    "click #add-quiz": function () {
        event.preventDefault();
        Session.set('questionNumber', -1);
        Router.go('create');
    },
    "click .edit-quiz": function () {
        Session.set('currentQuiz', this._id);
        Router.go('/create');
    },
    "click .take-quiz": function () {
        Session.set('currentQuiz', this._id);
        Session.set('questionNumber', 0);
        Session.set('report', '');
        Router.go('/play/' + this._id);
    }
});
