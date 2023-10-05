# otel-metrics-cpu-utilization

There is a possible issue in `system.cpu.utilization` and `process.cpu.utilization` 
host metrics. The values provided by the metric seems not to be following their semantic
conventions. the goal of this repository is to provide an easy way to get sample data
to confirm it.

## Reproduce the issue

Requirements:
- NodeJS >=14 (according to Otel packages requirements)

To get host metrics on the terminal just run

- `npm install` to get dependencies
- `npm start` to start the nodejs server and get the host metrics (in intervals of 5sec)

inspect the logs

## Utilization metrics

`system.cpu.utilization` is a gauge with values within the segment [0,1] according
to its [semantic convetion](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/system/system-metrics.md#metric-systemcpuutilization). In the logged metrics we see that the value can surpass
the upper bound (the value 1). Here's a sample showing values far superior to 1

```js
{
  descriptor: {
    name: 'system.cpu.utilization',
    type: 'OBSERVABLE_GAUGE',
    description: 'Cpu usage time 0-1',
    unit: '',
    valueType: 1
  },
  dataPointType: 2,
  dataPoints: [
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 157.82086149302881
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 143.03498303049165
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 1083.5302883959548
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 9.709374805061445
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 1321.9724671926265
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 23.66788799598938
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 9.39302926003438
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 1362.709911550165
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 0
    }
    // ...
  ]
}
```


Same situation happens to `process.cpu.utilization` where the [defintion](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/system/process-metrics.md) is the same (gauge between 0 and 1)
and we get values above 1. Sample log below

```js
{
  descriptor: {
    name: 'process.cpu.utilization',
    type: 'OBSERVABLE_GAUGE',
    description: 'Process Cpu usage time 0-1',
    unit: '',
    valueType: 1
  },
  dataPointType: 2,
  dataPoints: [
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 53.399801909815274
    },
    {
      attributes: [Object],
      startTime: [Array],
      endTime: [Array],
      value: 20.55524339747741
    }
  ]
}
```
