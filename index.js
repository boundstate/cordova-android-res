var androidRes = require('android-res');
var colors = require('colors');
var glob = require("glob")
var Q = require('q');

/**
 * @var {Object} console utils
 */
var display = {
  success: function (str) {
    str = '✓  '.green + str;
    console.log('  ' + str);
  },
  error: function (str) {
    str = '✗  '.red + str;
    console.log('  ' + str);
  },
  header: function (str) {
    console.log('');
    console.log(' ' + str.cyan.underline);
    console.log('');
  }
};

/**
 * Generates Android resources from the android-res folder.
 */
function run() {
  var completeDeferred = Q.defer();
  var promises = [];
  var options = {
    dest: 'platforms/android/res/'
  };

  display.header('Generating Android resources');

  glob('android-res/**/*', function (err, files) {
    if (err) {
      display.error(err);
      return;
    }

    if (files.length === 0) {
      display.error('No resources found at "android-res/"');
      return;
    }

    files.forEach(function (file) {
      var promise = androidRes(file, options);
      promise
        .catch(function (err) {
          display.error(err);
        })
        .progress(function (data) {
          display.success(data.dest + ' (' + data.width + 'x' + data.height + ')');
        });
      promises.push(promise);
    });

    Q.all(promises)
      .catch(function (err) {
        completeDeferred.reject(err);
      })
      .then(function() {
        completeDeferred.resolve();
      })
      .finally(function() {
        console.log('');
      });
  });

  return completeDeferred.promise;
}

module.exports = run;