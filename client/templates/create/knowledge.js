Template.knowledgeCreator.events({
    "click .add.icon.link": function (event, template) {
        this.multipleChoices.push({
            number: this.multipleChoices.length + 1,
            text: '',
            truth: false,
            type: 'checkbox'
        });
        Meteor.call('updateProblem', this);
    },
    "click .delete.icon.link": function (event, template) {
        var problem = template.parent().data;
        problem.multipleChoices = _.without(problem.multipleChoices, this);
        Meteor.call('updateProblem', problem);
    }
});

Template.knowledgeCreator.onRendered(function () {
    $('.ui.checkbox').checkbox();
    var option = this.data.multipleChoices[0];
    if (option && option.type) {
        $('.ui.dropdown').dropdown('set selected', option.type);
    }
});

Template.multipleChoiceOption.events({
    "click .truth": function (event, template) {
        var problem = template.parent().data;
        if (this.type === 'radio') {
            _.each(problem.multipleChoices, function (value) {
                value.truth = false;
            });
        }
        this.truth = !this.truth;
        Meteor.call('updateProblem', problem);
    },
    "keyup input": function (event, template) {
        this.text = event.target.value;
        Meteor.call('updateProblem', template.parent().data);
    }
});
//TODO: work code snippets back in
Template.multipleChoiceType.onRendered(function () {
    var instance = this;
    $('.ui.dropdown').dropdown({
        onChange: function (value) {
            var problem = instance.parent().data;
            _.each(problem.multipleChoices, function (option, index) {
                option.type = value;
                if (option.type === 'radio') {
                    option.truth = (index < 1);
                }
            });
            Meteor.call('updateProblem', problem);
        }
    });
});

Template.optionPreview.helpers({
    checked: function () {
        return (this.truth) ? 'checked' : '';
    }
});
