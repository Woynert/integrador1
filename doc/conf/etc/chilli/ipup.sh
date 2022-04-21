#!/bin/sh
#
# Allow IP masquerading through this box
/usr/sbin/iptables -t nat -A POSTROUTING -o enp8s0 -j MASQUERADE
