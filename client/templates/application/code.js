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
            question = Session.get('report');
        question[number]['answers'] = cm.getValue().split(delimiter);
        Session.set('report', question);
    });
    document.getElementById('answer-code-' + this.data.number).editor = code;
});

Template.codeEditor.onRendered(function () {
    var code = CodeMirror.fromTextArea(
        this.find('#code-editor-' + this.data.number), {
            lineNumbers: true,
            theme: 'lesser-dark'
        });
    code.on("change", function (cm, change) {
        var number = $(cm.getTextArea()).attr('number'),
            question = Session.get('report');
        question[number]['code'] = cm.getValue();
        Session.set('report', question);
    });
    document.getElementById('code-editor-' + this.data.number).editor = code;
});

Template.languageSelectorDropdown.onRendered(function () {
    $('.dropdown').dropdown({
        onChange: function (value) {
            var number = $(this).attr('number');
            document.getElementById('code-editor-' + number).editor.setOption('mode', value);
            document.getElementById('answer-code-' + number).editor.setOption('mode', value);
            var question = Session.get('report');
            question[number]['language'] = value;
            Session.set('report', question);
        }
    });
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
