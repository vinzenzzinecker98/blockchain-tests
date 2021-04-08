#!/bin/bash -e

echo "...logging..."
printf "      date     time $(free -m | grep total | sed -E 's/^    (.*)/\1/g')\n" >> memlog.txt
while true; do
    printf "$(date '+%Y-%m-%d %H:%M:%S') $(free -m | grep Mem: | sed 's/Mem://g')\n" >> memlog.txt
    cat /proc/loadavg >> cpulog.txt    
    #echo "CPU `LC_ALL=C top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}'`% RAM `free -m | awk '/Mem:/ { printf("%3.1f%%", $3/$2*100) }'` HDD `df -h / | awk '/\// {print $(NF-1)}'`" >> cpulog3.txt
    mpstat 1 1 | awk '/all/{ print 100 - $NF; exit; }' >> cpulog2.txt
done