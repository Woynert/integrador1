#!/bin/sh
# Coova Chilli - David Bird <david@coova.com>
# Licensed under the GPL, see http://coova.org/
# down.sh /dev/tun0 192.168.0.10 255.255.255.0

TUNTAP=$(basename $DEV)
UNDO_FILE=/opt/chilli/var/run/chilli.$TUNTAP.sh

. /opt/chilli/etc/chilli/functions

run_down() {
    [ -e "$UNDO_FILE" ] && sh $UNDO_FILE 2>/dev/null
    rm -f $UNDO_FILE 2>/dev/null
    
    # site specific stuff optional
    [ -e /opt/chilli/etc/chilli/ipdown.sh ] && . /opt/chilli/etc/chilli/ipdown.sh
}

FLOCK=$(which flock)
if [ -n "$FLOCK" ] && [ -z "$LOCKED_FILE" ]
then
    export LOCKED_FILE=/tmp/.chilli-flock
    flock -x $LOCKED_FILE -c "$0 $@"
else
    run_down
fi
