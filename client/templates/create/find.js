Template.find.onRendered(function () {
    Session.set("answered", false);
    this.$('#selected-code').text("");
    var codePrompt = $('#code-prompt-' + this.data.number),
        language = (this.data.language === 'htmlmixed') ? 'language-html' : this.data.language;
    hljs.highlightBlock(codePrompt[0]);
    $('.hljs').html(function (_, html) {
        return html.replace(/(?:span\>)\s(?!abc)\w+/g, function (match) {
            return 'span> <span class="variable-name">' + match.replace('span> ', '') + '</span>';
        });
    });
});
