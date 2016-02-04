Meteor.startup(function () {
    Transitioner.default({
        in: 'transition.perspectiveLeftIn',
        out: 'transition.perspectiveDownOut'
    });
});
