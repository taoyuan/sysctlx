
exports.STATUS_NOT_FOUND = `Unit create_a.service could not be found.`;

exports.STATUS_INACTIVE = `● create_ap.service - Create AP Service
   Loaded: loaded (/usr/lib/systemd/system/create_ap.service; disabled; vendor preset: enabled)
   Active: inactive (dead)

Jan 28 09:37:12 bittpi create_ap[29383]: Failed to create interface mon.wlan0: -95 (Operation not supported)
Jan 28 09:37:12 bittpi create_ap[29383]: wlan0: Could not connect to kernel driver
Jan 28 09:37:12 bittpi create_ap[29383]: Using interface wlan0 with hwaddr b8:27:eb:7e:11:87 and ssid "MyAccessPoint
Jan 28 09:37:13 bittpi create_ap[29383]: wlan0: interface state UNINITIALIZED->ENABLED
Jan 28 09:37:13 bittpi create_ap[29383]: wlan0: AP-ENABLED
Jan 28 09:38:28 bittpi systemd[1]: Stopping Create AP Service...
Jan 28 09:38:28 bittpi create_ap[29383]: Doing cleanup.. wlan0: interface state ENABLED->DISABLED
Jan 28 09:38:28 bittpi create_ap[29383]: wlan0: AP-DISABLED
Jan 28 09:38:29 bittpi create_ap[29383]: done
Jan 28 09:38:29 bittpi systemd[1]: Stopped Create AP Service.`;

exports.STATUS_DISABLED = `● create_ap.service - Create AP Service
   Loaded: loaded (/usr/lib/systemd/system/create_ap.service; disabled; vendor preset: enabled)
   Active: inactive (dead)`;

exports.STATUS_ENABLED = `● create_ap.service - Create AP Service
   Loaded: loaded (/usr/lib/systemd/system/create_ap.service; enabled; vendor preset: enabled)
   Active: inactive (dead)`;

exports.STATUS_ACTIVE = `● create_ap.service - Create AP Service
   Loaded: loaded (/usr/lib/systemd/system/create_ap.service; disabled; vendor preset: enabled)
   Active: active (running) since Sun 2018-01-28 09:37:11 UTC; 28s ago
 Main PID: 29383 (create_ap)
   CGroup: /system.slice/create_ap.service
           ├─29383 /bin/bash /usr/bin/create_ap --config /etc/create_ap.conf
           ├─29484 dnsmasq -C /tmp/create_ap.wlan0.conf.eFKgFtKh/dnsmasq.conf -x /tmp/create_ap.wlan0.conf.eFKgFtKh/
           ├─29485 /bin/bash /usr/bin/create_ap --config /etc/create_ap.conf
           ├─29490 /usr/sbin/hostapd /tmp/create_ap.wlan0.conf.eFKgFtKh/hostapd.conf
           └─29696 /bin/bash /usr/bin/create_ap --config /etc/create_ap.conf

Jan 28 09:37:12 bittpi dnsmasq-dhcp[29484]: DHCP, IP range 10.0.0.1 -- 10.0.0.254, lease time 1d
Jan 28 09:37:12 bittpi dnsmasq[29484]: reading /etc/resolv.conf
Jan 28 09:37:12 bittpi dnsmasq[29484]: using nameserver 127.0.0.1#53
Jan 28 09:37:12 bittpi dnsmasq[29484]: cleared cache
Jan 28 09:37:12 bittpi create_ap[29383]: Configuration file: /tmp/create_ap.wlan0.conf.eFKgFtKh/hostapd.conf
Jan 28 09:37:12 bittpi create_ap[29383]: Failed to create interface mon.wlan0: -95 (Operation not supported)
Jan 28 09:37:12 bittpi create_ap[29383]: wlan0: Could not connect to kernel driver
Jan 28 09:37:12 bittpi create_ap[29383]: Using interface wlan0 with hwaddr b8:27:eb:7e:11:87 and ssid "MyAccessPoint
Jan 28 09:37:13 bittpi create_ap[29383]: wlan0: interface state UNINITIALIZED->ENABLED
Jan 28 09:37:13 bittpi create_ap[29383]: wlan0: AP-ENABLED`;

exports.STATUS_ERROR = `● test.service
   Loaded: error (Reason: Invalid argument)
   Active: inactive (dead)

Jan 28 11:37:11 bittpi systemd[1]: [/etc/systemd/system/test.service:1] Unknown secti
Jan 28 11:37:11 bittpi systemd[1]: test.service: Service lacks both ExecStart= and Ex
`;


