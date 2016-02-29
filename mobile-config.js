// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'com.candid.cat',
    name: 'candid cat',
    description: 'A straightforward code assessment tool',
    author: 'Barbara Holt',
    email: 'candidcatnips@gmail.com',
    website: 'http://candidcat.meteor.com'
});

// Set up resources such as icons and launch screens.
App.icons({
    'android_ldpi': 'public/icons/inverted-logo.png',
    'android_mdpi': 'public/icons/inverted-logo.png',
    'android_hdpi': 'public/icons/inverted-logo.png',
    'android_xhdpi': 'public/icons/inverted-logo.png',
/*    'ipad': 'public/icons/inverted-logo.png',
    'ipad_2x': 'public/icons/inverted-logo.png',
    'iphone': 'public/icons/inverted-logo.png',
    'iphone_2x': 'public/icons/inverted-logo@2x.png'*/
});

App.launchScreens({
    'android_ldpi_landscape': 'public/icons/nine-logo.png',
    'android_ldpi_portrait': 'public/icons/nine-logo.png',
    'android_mdpi_landscape': 'public/icons/nine-logo.png',
    'android_mdpi_portrait': 'public/icons/nine-logo.png',
    'android_hdpi_landscape': 'public/icons/nine-logo.png',
    'android_hdpi_portrait': 'public/icons/nine-logo.png',
    'android_xhdpi_landscape': 'public/icons/nine-logo.png',
    'android_xhdpi_portrait': 'public/icons/nine-logo.png',
    /*'ipad_landscape': 'splash/Default~iphone.png',
    'ipad_portrait': 'splash/Default~iphone.png',
    'ipad_landscape_2x': 'splash/Default~iphone.png',
    'ipad_portrait_2x': 'splash/Default~iphone.png',
    'iphone': 'splash/Default~iphone.png',
    'iphone_2x': 'splash/Default@2x~iphone.png',
    'iphone5': 'splash/Default@2x~iphone.png',
    'iphone6': 'splash/Default@2x~iphone.png',
    'iphone6p_landscape': 'splash/Default@2x~iphone.png',
    'iphone6p_portrait': 'splash/Default@2x~iphone.png'*/
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
