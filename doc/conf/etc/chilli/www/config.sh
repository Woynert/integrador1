#!/bin/sh
if [ -f config-local.sh ]; then
    . ./config-local.sh 
else
    [ -f /opt/chilli/etc/chilli/defaults ] && . /opt/chilli/etc/chilli/defaults
    [ -f /opt/chilli/etc/chilli/config ]   && . /opt/chilli/etc/chilli/config
fi
