Accounts.onCreateUser(function (options, user) {
    var userData = {
        email: getEmail(user),
        name: getName(options, user)
    };
    if (userData.email) {
        Meteor.call('sendWelcomeEmail', userData, function (error) {
            if (error) {
                // console.log('EMAIL ERROR: ', error);
            }
        });
    }
    user.profile = {
        joined: new Date(),
        name: userData.name,
        email: userData.email,
        picture: getPicture(user.services),
        username: options.username
    };
    return user;
});

var getEmail = function (user) {
    var emailAddress;
    if (user.emails) {
        emailAddress = user.emails[0].address;
    } else if (user.services) {
        var services = user.services;
        if (services.facebook) {
            emailAddress = services.facebook.email;
        }
        if (services.github) {
            emailAddress = services.github.email;
        }
        if (services.google) {
            emailAddress = services.google.email;
        }
    }
    return emailAddress;
};

var getName = function (options, user) {
    if (options.profile && options.profile.name) {
        return options.profile.name
    } else if (user.services.github) {
        return user.services.github.username
    } else {
        return options.username;
    }
};

var getPicture = function (services) {
    if (services.facebook) {
        return "http://graph.facebook.com/" + services.facebook.id + "/picture/?type=large";
    } else if (services.google) {
        return services.google.picture;
    }
};
