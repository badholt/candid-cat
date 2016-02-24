Template.answerCode.onRendered(function () {
    var code = CodeMirror.fromTextArea(
        this.find('#answer-code-' + this.data.number), {
            lineNumbers: true,
            theme: 'lesser-dark'
        });
    code.setSize(null, 100);
    code.on("change", function (cm, change) {
        var form = $('.form').form('get values'),
            delimiter = (form.delimiter) ? form.delimiter : ',',
            number = $(cm.getTextArea()).attr('number'),
            questions = Quizzes.findOne(Session.get('currentQuiz')).questions,
            problem = Problems.findOne(questions[number]);
        problem['answers'] = cm.getValue().split(delimiter);
        Meteor.call('updateProblem', problem);
    });
    document.getElementById('answer-code-' + this.data.number).editor = code;
    if (this.data.answers) {
        document.getElementById('answer-code-' + this.data.number)
            .editor.setOption('value', this.data.answers.toString());
    }
});

Template.codeEditor.onRendered(function () {
    var code = CodeMirror.fromTextArea(
        this.find('#code-editor-' + this.data.number), {
            lineNumbers: true,
            theme: 'lesser-dark'
        });
    code.on("change", function (cm, change) {
        var number = $(cm.getTextArea()).attr('number'),
            questions = Quizzes.findOne(Session.get('currentQuiz')).questions,
            problem = Problems.findOne(questions[number]);
        problem['code'] = cm.getValue();
        Meteor.call('updateProblem', problem);
    });
    document.getElementById('code-editor-' + this.data.number).editor = code;
});

Template.languageSelectorDropdown.onRendered(function () {
    var dropdown = $('.ui.dropdown');
    dropdown.dropdown({
        onChange: function (value) {
            /*var number = $(this).attr('number'),
             questions = Quizzes.findOne(Session.get('currentQuiz')).problems(),
             problem = questions[number];console.log(Quizzes.findOne(Session.get('currentQuiz')).problems());*/
            var number = $(this).attr('number'),
                questions = Quizzes.findOne(Session.get('currentQuiz')).questions,
                problem = Problems.findOne(questions[number]);
            var code = document.getElementById('code-editor-' + number).editor;
            if (code) {
                code.setOption('mode', value);
            }
            var answerBox = document.getElementById('answer-code-' + number);
            if (answerBox) {
                var answers = answerBox.editor;
                if (answers) {
                    answers.setOption('mode', value);
                }
            }
            problem['language'] = value;
            Meteor.call('updateProblem', problem);
        }
    });
    if (this.data.language) {
        dropdown.dropdown('set selected', this.data.language);
    }
});

Template.viewSelector.onRendered(function () {
    $('.checkbox').checkbox({
        onChecked: function () {
            var number = $(this).attr('number');
            document.getElementById('code-editor-' + number).editor.setOption('theme', 'lesser-dark');
            document.getElementById('answer-code-' + number).editor.setOption('theme', 'lesser-dark');
            $(this).next().find('.icon').removeClass('sun').addClass('moon');
        },
        onUnchecked: function () {
            var number = $(this).attr('number');
            document.getElementById('code-editor-' + number).editor.setOption('theme', 'eclipse');
            document.getElementById('answer-code-' + number).editor.setOption('theme', 'eclipse');
            $(this).next().find('.icon').removeClass('moon').addClass('sun');
        }
    }).checkbox('set checked');
});
