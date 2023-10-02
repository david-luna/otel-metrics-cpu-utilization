// Start Node SDK
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleMetricExporter, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
    exportIntervalMillis: 5000,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Add Host Metrics
const { metrics } = require('@opentelemetry/api');
const { HostMetrics } = require('@opentelemetry/host-metrics');
const hostMetrics = new HostMetrics({
  meterProvider: metrics.getMeterProvider(),
  name: 'host-metrics-sample'
});
hostMetrics.start();

process.on("SIGTERM", () => {
  console.log('OTel SDK shutting down (SIGTERM)')
  sdk
    .shutdown()
    .then(
      () => console.log("OTel SDK shutdown successfully"),
      (err) => console.log("OTel SDK shutdown error:", err)
    )
    .finally(() => process.exit())
})


