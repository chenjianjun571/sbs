#!/bin/sh


function comp()
{
    js_dir='./src/client'
    dirs=`ls -l $js_dir | grep ^d | awk '{print $9}'`

    for dir in $dirs
    do
        js_file_list=`ls -l $js_dir/$dir/*.js | awk '{print $9}'`
        for file_path in $js_file_list
        do
            echo $file_path

            file=$(basename "$file_path")
            extension="${file##*.}"
            filename="${file%.*}"

            watchify $file_path -o "uglifyjs -cm > ./assets/script/modules/$dir/$filename.min.$extension" &
            sleep 16
            PIDS=`ps -ef|grep watchify|grep -v grep|awk '{print $2}'`
            for pid in $PIDS
            do
                kill -9 $pid
            done
        done
    done

    js_file_list=`ls -l $js_dir/*.js | awk '{print $9}'`
    for file_path in $js_file_list
    do
        echo $file_path

        file=$(basename "$file_path")
        extension="${file##*.}"
        filename="${file%.*}"

        watchify $file_path -o "uglifyjs -cm > ./assets/script/modules/$filename.min.$extension" &
        sleep 16
        PIDS=`ps -ef|grep watchify|grep -v grep|awk '{print $2}'`
        for pid in $PIDS
        do
            kill -9 $pid
        done
    done
}

comp
