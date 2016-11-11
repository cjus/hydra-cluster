/**
 * This is the base javascript file that webpack transpiles, and includes all of the sub directories and tests
 */
var testsContext = require.context('./src', true, /.test\.js$/);
testsContext.keys().forEach(testsContext);
