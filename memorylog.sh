#!/bin/bash -e

echo "...logging..."
# add caption
printf "      date     time $(free -m | grep total | sed -E 's/^    (.*)/\1/g')\n" >> memlog.txt

while true; do
    #print the ram infos to the logfile
    printf "$(date '+%Y-%m-%d %H:%M:%S') $(free -m | grep Mem: | sed 's/Mem://g')\n" >> memlog.txt
    #print the cpu load average (processes in queue averaged over 1 minute) into the cpu logfle
    cat /proc/loadavg >> cpulog.txt    
    #print 100 - percentage of the CPU of the Idle process (NF is the last entry of the mpstat command) This command also waits for 1 second - so no wait() is necessary for the loop
    mpstat 1 1 | awk '/all/{ print 100 - $NF; exit; }' >> cpulog2.txt
done