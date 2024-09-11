if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  const appInsights = require('applicationinsights');
  appInsights.setup()
      .setAutoCollectExceptions(false) // logger handles these
      .start();
  appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'hmpps-hpa';
  module.exports = appInsights;
} else {
  module.exports = null;
}
