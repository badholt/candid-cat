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

createServiceConfiguration('facebook', '1672112769725424', 'c217a10b77496a11211414d4c7c35613');
createServiceConfiguration('github', 'f845939ad09fb6de600a', 'b7f238708288cdfbd214dfa04103713d9bee90f0');
createServiceConfiguration('google', '871107455612-igf29p26qfc82dqj5gqtni0kr4qu8nja.apps.googleusercontent.com', 'wSHzpgQhwxagfSy2lWpoJLp6');
