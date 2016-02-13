Template.codeEditor.onRendered(function () {
    document.getElementById('code-editor-' + this.data.number).editor = CodeMirror.fromTextArea(
        this.find('#code-editor-' + this.data.number), {
            lineNumbers: true,
            theme: 'lesser-dark'
        });
});

Template.languageSelectorDropdown.onRendered(function () {
    $('.dropdown').dropdown({
        onChange: function (value) {
            document.getElementById('code-editor-' + $(this).attr('number')).editor.setOption('mode', value);
        }
    });
});

Template.viewSelector.onRendered(function () {
    $('.checkbox').checkbox({
        onChecked: function () {
            document.getElementById('code-editor-' + $(this).attr('number')).editor.setOption('theme', 'lesser-dark');
            $(this).next().find('.icon').removeClass('sun').addClass('moon');
        },
        onUnchecked: function () {
            document.getElementById('code-editor-' + $(this).attr('number')).editor.setOption('theme', 'eclipse');
            $(this).next().find('.icon').removeClass('moon').addClass('sun');
        }
    }).checkbox('set checked');
});
