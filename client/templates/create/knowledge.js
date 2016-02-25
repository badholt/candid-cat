Template.knowledge.helpers({
    choices: function () {
        return _.shuffle(this.multipleChoices);
    }
});

Template.knowledge.onRendered(function () {
   $('.checkbox').checkbox({
       onChange: function () {
           var answered = Session.get('answered');
           Session.set('answered', true);
       }
   });
});

Template.knowledgeCreator.events({
    "click .add-code-snippet": function (event, template) {
        var useCodeSnippet = template.useCodeSnippet.get();
        if (useCodeSnippet) {
            $('.CodeMirror').remove();
        }
        template.useCodeSnippet.set(!useCodeSnippet);
        this.useCode = !useCodeSnippet;
        Meteor.call('updateProblem', this);
    },
    "click .add.icon.link": function (event, template) {
        this.multipleChoices.push({
            number: this.multipleChoices.length + 1,
            text: '',
            truth: false,
            type: (this.multipleChoices[0]) ? this.multipleChoices[0].type : 'checkbox'
        });
        Meteor.call('updateProblem', this);
    },
    "click .delete.icon.link": function (event, template) {
        var problem = template.parent().data;
        problem.multipleChoices = _.without(problem.multipleChoices, this);
        Meteor.call('updateProblem', problem);
    }
});

Template.knowledgeCreator.helpers({
    useCodeSnippet: function () {
        return Template.instance().useCodeSnippet.get();
    }
});

Template.knowledgeCreator.onCreated(function () {
    var using = (this.data.useCode) ? true : false;
    this.useCodeSnippet = new ReactiveVar(using);
});

Template.knowledgeCreator.onRendered(function () {
    $('.ui.checkbox').checkbox();
    var option = this.data.multipleChoices[0];
    if (option && option.type) {
        $('#multiple-choice-type').dropdown('set selected', option.type);
    }
});

Template.multipleChoiceOption.events({
    "click .truth": function (event, template) {
        var problem = template.parent().data;
        if (this.type === 'radio') {
            _.each(problem.multipleChoices, function (value) {
                value.truth = false;
                problem.answers = _.without(problem.answers, value.number);
            });
        }
        this.truth = !this.truth;
        if (this.truth) {
            problem.answers.push(this.number);
        } else {
            problem.answers = _.without(problem.answers, this.number);
        }
        console.log(problem);
        Meteor.call('updateProblem', problem);
    },
    "keyup input": function (event, template) {
        this.text = event.target.value;
        Meteor.call('updateProblem', template.parent().data);
    }
});

Template.multipleChoiceType.onRendered(function () {
    var instance = this;
    instance.$('#multiple-choice-type').dropdown({
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
