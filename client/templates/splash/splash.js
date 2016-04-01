Template.welcome.events({
    "click #login": function () {
        Router.go('login');
    },
    "click #sign-up": function () {
        Router.go('login');
    }
});

Template.welcome.onRendered(function () {
    Transitioner.transition({
        fromRoute: 'login',
        toRoute: 'home',
        velocityAnimation: {
            in: 'transition.perspectiveLeftIn',
            out: 'transition.slideRightOut'
        }
    });
});

Template.login.events({
    "click #homeward-bound": function () {
        Router.go('home');
    },
    "click #facebook-login": function () {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function (error) {
            if (error) {
                // console.log(error.reason)
            } else {
                Router.go('home');
            }
        });
    },
    "click #google-login": function () {
        Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, function (error) {
            if (error) {
                // console.log(error.reason)
            } else {
                Router.go('home');
            }
        });
    },
    "click #github-login": function () {
        Meteor.loginWithGithub({
            requestPermissions: ['user:email']
        }, function (error) {
            if (error) {
                // console.log(error.reason)
            } else {
                Router.go('home');
            }
        });
    },
    "submit #login-form": function (event) {
        event.preventDefault();
        var values = $('#login-form').form('get values');
        if (!Session.get('signUp')) {
            Meteor.loginWithPassword(values.email, values.password, function (error) {
                if (!error) {
                    Router.go('home');
                } else {
                    Session.set('signUp', true);
                }
            });
        } else {
            var username = $('[name="username"]').val();
            Accounts.createUser({
                email: values.email,
                password: values.password,
                username: username
            }, function (error) {
                if (!error) {
                    return Meteor.loginWithPassword(values.email, values.password, function (error) {
                        if (!error) {
                            Session.set('signUp', false);
                            Router.go('home');
                        } else {
                            // console.log(error);
                        }
                    });
                }
                throw error;
            });
        }
        return false;
    }
});
