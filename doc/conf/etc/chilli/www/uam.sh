# -*- mode: shell-script -*-
# Copyright (C) 2009-2012 David Bird (Coova Technologies) <support@coova.com>
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 2 of the License, or
# (at your option) any later version.
#  
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#  
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


invalid_input() {
    filt=$(echo "$1"|sed "s/[^a-zA-Z0-9 _'@,\.-]//g")
    [ "$filt" = "$1" ] && return 1
    return 0
}

uamrootdir=/opt/chilli/etc/chilli
uamwwwdir="$uamrootdir/www"
tmpdir="/tmp"

LOCATION_NAME=$HS_LOC_NAME
LOCATION_NAME=${LOCATION_NAME:-My HotSpot}

uampath () {
    ufile="$uamwwwdir/$1.txt"
    cfile="$uamwwwdir/$1.tmpl"
    [ -s $ufile ] && cfile=$ufile
    echo $cfile
}

uamfile () {
    cfile=$(uampath $1)
    [ "$2" = "1" ] && echo "<div id=\"$1\">"
    eval "cat<<EOF 
$(cat $cfile)
EOF
"
    [ "$2" = "1" ] && echo "</div>"
}

