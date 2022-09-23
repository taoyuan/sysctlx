# sysctlx [![Build Status](https://travis-ci.org/taoyuan/sysctlx.svg?branch=master)](https://travis-ci.org/taoyuan/sysctlx)

> A node library to manipulate services with systemctl


## Install

```
$ npm install sysctlx
```

## Usage

### Start a service:
```
let ctl = require('sysctlx');
ctl.start("servicename").then(function(result){
   //Control Logic
})
```

### Stop a Service:
```
let ctl = require('sysctlx');
ctl.stop("servicename").then(function(result){
   //Control Logic
})
```

### Restart a Service
```
let ctl = require('sysctlx');
ctl.restart("servicename").then(function(result){
   //Control Logic
   
})
```

### Enable a Service
```
let ctl = require('sysctlx');
ctl.enable("servicename").then(function(result){
   //Control Logic
   
})
```

### Disable a Service
```
let ctl = require('sysctlx');
ctl.disable("servicename").then(function(result){
   //Control Logic
})
```

### Service Status
```
let ctl = require('sysctlx');
ctl.status("servicename").then(function(result){
   //Control Logic
   
})
```

#### Return Object for Service Status
```
{ name: 'servicename',
  description: 'service description',
  loaded: true,
  file: '/servicepath/servicename.service',
  startup: 'enabled',
  props: { 'key': 'value' },
  active: 'activity', //active or inactive
  started: 1999-09-23T12:57:54.000Z,
  pid: '9999',
  raw:
   'raw command and result of the command.' }
```

## License

MIT © [ty](https://github.com/taoyuan)
