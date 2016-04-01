createServiceConfiguration = function (service, clientId, secret) {
    ServiceConfiguration.configurations.remove({
        service: service
    });

    var configuration = {
        facebook: {
            appId: clientId,
            secret: secret,
            service: service
        },
        generic: {
            clientId: clientId,
            secret: secret,
            service: service
        }
    };

    if (service === 'facebook') {
        ServiceConfiguration.configurations.insert(configuration.facebook);
    } else {
        ServiceConfiguration.configurations.insert(configuration.generic);
    }
};

createServiceConfiguration('facebook', Meteor.settings.facebook.clientID, Meteor.settings.facebook.clientSecret);
createServiceConfiguration('github', Meteor.settings.github.clientID, Meteor.settings.github.clientSecret);
createServiceConfiguration('google', Meteor.settings.google.clientID, Meteor.settings.google.clientSecret);
