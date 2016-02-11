Template.footer.onRendered(function () {
    $('#quizProgress').progress({
        label: 'ratio',
        text: {
            active: '{value} of {total}',
            success: 'Complete!'
        },
        total: 8,
        value: Session.get('questionNumber')
    });
});
