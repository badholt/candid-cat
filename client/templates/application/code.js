Template.codeAnswer.onRendered(function () {
    var code = CodeMirror.fromTextArea(
        this.find('#code-answer-' + this.data.number), {
            lineNumbers: true,
            theme: 'lesser-dark'
        });
    code.on("change", function (cm, change) {
        var form = $('.form').form('get values'),
            delimiter = (form.delimiter) ? form.delimiter : ',',
            number = $(cm.getTextArea()).attr('number'),
            questions = Quizzes.findOne(Session.get('currentQuiz')).questions,
            problem = Problems.findOne(questions[number]);
        problem['answers'] = cm.getValue().split(delimiter);
        Meteor.call('updateProblem', problem);
    });
    document.getElementById('code-answer-' + this.data.number).editor = code;
    if (this.data.answers) {
        document.getElementById('code-answer-' + this.data.number)
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
            problem = Problems.findOne(questions[number]),
            preview = document.getElementById('code-preview-' + number).editor,
            value = cm.getValue();
        problem['code'] = value;
        if (preview) preview.setValue(value);
        Meteor.call('updateProblem', problem);
    });
    var language = this.data.language;
    if (language && code) {
        code.setOption('mode', language);
    }
    document.getElementById('code-editor-' + this.data.number).editor = code;
});

Template.codePreview.onRendered(function () {
    var code = CodeMirror.fromTextArea(
        this.find('#code-preview-' + this.data.number), {
            lineNumbers: true,
            readOnly: 'nocursor',
            theme: 'lesser-dark'
        });
    var language = this.data.language;
    if (language && code) {
        code.setOption('mode', language);
    }
    document.getElementById('code-preview-' + this.data.number).editor = code;
});

Template.languageSelectorDropdown.onRendered(function () {
    var dropdown = this.$('.ui.dropdown');
    dropdown.dropdown({
        onChange: function (value) {
            var number = $(this).attr('number'),
                questions = Quizzes.findOne(Session.get('currentQuiz')).questions,
                problem = Problems.findOne(questions[number]);
            var answer = document.getElementById('code-answer-' + number),
                editor = document.getElementById('code-editor-' + number).editor,
                preview = document.getElementById('code-preview-' + number);
            if (editor) {
                editor.setOption('mode', value);
            }
            if (preview) {
                var previewCode = preview.editor;
                if (previewCode) {
                    previewCode.setOption('mode', value);
                }
            }
            if (answer) {
                var answerCode = answer.editor;
                if (answerCode) {
                    answerCode.setOption('mode', value);
                }
            }
            problem['language'] = value;
            Meteor.call('updateProblem', problem);
        }
    });
    var language = this.data.language;
    if (language) {
        dropdown.dropdown('set selected', language);
    }
});

Template.viewSelector.onRendered(function () {
    $('.checkbox').checkbox({
        onChecked: function () {
            var number = $(this).attr('number');
            document.getElementById('code-editor-' + number).editor.setOption('theme', 'lesser-dark');
            document.getElementById('code-answer-' + number).editor.setOption('theme', 'lesser-dark');
            $(this).next().find('.icon').removeClass('sun').addClass('moon');
        },
        onUnchecked: function () {
            var number = $(this).attr('number');
            document.getElementById('code-editor-' + number).editor.setOption('theme', 'eclipse');
            document.getElementById('code-answer-' + number).editor.setOption('theme', 'eclipse');
            $(this).next().find('.icon').removeClass('moon').addClass('sun');
        }
    }).checkbox('set checked');
});
