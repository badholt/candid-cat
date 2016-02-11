Router.configure({
    layoutTemplate: 'playtime',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.onBeforeAction('loading');

Router.route('home', {
    action: function () {
        if (!Meteor.userId()) {
            this.redirect('welcome');
        } else {
            this.render();
        }
    },
    name: 'home',
    path: '/',
    template: 'home',
    yieldTemplates: {
    'header': {to: 'header'}
}
});

Router.route('create', {
    action: function () {
        if (!Meteor.userId()) {
            this.redirect('welcome');
        } else {
            this.render();
        }
    },
    name: 'create',
    path: '/create',
    template: 'creator',
    yieldTemplates: {
        'header': {to: 'header'}
    }
});

Router.route('login', {
    name: 'login',
    layoutTemplate: 'splash',
    path: '/login',
    template: 'login'
});

Router.route('/play/:_id', {
    action: function () {
        if (!Meteor.userId()) {
            this.redirect('welcome');
        } else {
            this.render();
        }
    },
    data: function () {
        return Quizzes.findOne(this.params._id);
    },
    name: 'play',
    waitOn: function () {
        this.data();
    },
    yieldTemplates: {
        'header': {to: 'header'},
        'footer': {to: 'footer'}
    }
});

Router.route('welcome', {
    layoutTemplate: 'splash',
    name: 'welcome',
    path: '/welcome',
    template: 'welcome'
});
