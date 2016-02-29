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
    'android_ldpi': 'icons/inverted-logo.png',
    'android_mdpi': 'icons/inverted-logo.png',
    'android_hdpi': 'icons/inverted-logo.png',
    'android_xhdpi': 'icons/inverted-logo.png',
    'ipad': 'icons/inverted-logo.png',
    'ipad_2x': 'icons/inverted-logo.png',
    'iphone': 'icons/inverted-logo.png',
    'iphone_2x': 'icons/inverted-logo@2x.png'
});

App.launchScreens({
    'android_ldpi_landscape': 'icons/nine-logo.png',
    'android_ldpi_portrait': 'icons/nine-logo.png',
    'android_mdpi_landscape': 'icons/nine-logo.png',
    'android_mdpi_portrait': 'icons/nine-logo.png',
    'android_hdpi_landscape': 'icons/nine-logo.png',
    'android_hdpi_portrait': 'icons/nine-logo.png',
    'android_xhdpi_landscape': 'icons/nine-logo.png',
    'android_xhdpi_portrait': 'icons/nine-logo.png',
    'ipad_landscape': 'splash/Default~iphone.png',
    'ipad_portrait': 'splash/Default~iphone.png',
    'ipad_landscape_2x': 'splash/Default~iphone.png',
    'ipad_portrait_2x': 'splash/Default~iphone.png',
    'iphone': 'splash/Default~iphone.png',
    'iphone_2x': 'splash/Default@2x~iphone.png',
    'iphone5': 'splash/Default@2x~iphone.png',
    'iphone6': 'splash/Default@2x~iphone.png',
    'iphone6p_landscape': 'splash/Default@2x~iphone.png',
    'iphone6p_portrait': 'splash/Default@2x~iphone.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
