# cordova-android-res

Automatic Android resource resizing for Cordova. Create an `android-res` folder containing the images you want to resize 
in the root folder of your Cordova project and use cordova-android-res to automatically resize and copy the images for 
all current Android devices.

### Manual usage

1. `npm install -g cordova-android-res`
2. Create an `android-res` folder containing the images you want to resize in the root folder of your Cordova project
3. Run `cordova-android-res`.

### Automated usage

1. `npm install cordova-android-res --save-dev`

2. Create `my-android-res-hook.js`
    ```javascript
    var cordovaAndroidRes = require('cordova-android-res');
    
    module.exports = function() {
      return cordovaAndroidRes();
    };
    ```

3. Add hook to `config.xml`
    ```xml
    <hook src="my-android-res-hook.js" type="after_platform_add" />
    ```

That's it. Now every time you `cordova add platform`, the Android resources will be auto generated.

### Requirements

- GraphicsMagick
- Android platform added to your project

### License

MIT