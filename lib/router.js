Router.configure({
    layoutTemplate: 'frame',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.onBeforeAction('loading');

Router.route('home', {
    name: 'home',
    path: '/',
    template: 'home',
    yieldTemplates: {
        'header': {to: 'header'},
        'footer': {to: 'footer'}
    }
});