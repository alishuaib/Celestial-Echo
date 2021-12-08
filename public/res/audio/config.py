#A small script to get information for each of the Songs and place it in a JSON config file for the webserver to use as reference.

import os
import json
import mutagen
import importlib
from os import listdir
from os.path import isfile, join,isdir

from pathlib import Path

mypath=Path(__file__).parent
albums=[f for f in listdir(mypath) if isdir(join(mypath, f))]
index=input("Select Album:\n"+"".join(str(i+1)+"| "+f+"\n" for f,i in zip(albums,range(len(albums))) if isdir(join(mypath,f)))+">> ")
mypath=mypath/albums[int(index)-1]

exists=False
for f in listdir(mypath):
    if f.endswith(".json"):
        exists=True
        break


def getSongs(p,ext):
    songs=[]
    for file in listdir(mypath):
        if isfile(mypath/file):
            for x in ext:
                if file.endswith(x):
                    sFile=mutagen.File(mypath/file)
                    s={
                        "name":file.replace(x,""),
                        "duration":sFile.info.length,
                        "tags":[],
                        "stats":{
                            "MIME":sFile.mime,
                            "bitrate":sFile.info.bitrate,
                            "sample_rate":sFile.info.sample_rate,
                            "channels":sFile.info.channels,
                        }
                    }
                    songs.append(s)
    return songs


song_data=getSongs(mypath,[".mp3"])
INIT_CONFIG={
    "name":albums[int(index)-1],
    "artist":"Unknown",
    "date":"MM/DD/YYYY",
    "source":"",
    "count":len(song_data),
    "tags":[],
    "songs":song_data
}

if exists:
    res=input("Config file already exists...\nUpdate - U\nReset - R\nCancel - N\n>> ").lower()
    if res=="n":
        exit()
    elif res=="r":
        os.remove(mypath/"config.json")
        with open(mypath/"config.json","w") as config:
            json.dump(INIT_CONFIG,config,indent=4)
        print("$config.json reset successfully")
    elif res=="u":
        with open(mypath/"config.json","rw") as config:
            data=json.loads(config)
            update=INIT_CONFIG.update(data)
            json.dump(INIT_CONFIG,config,indent=4)
        print("$config.json update successfully")

else:
    with open(mypath/"config.json","w") as config:
        json.dump(INIT_CONFIG,config,indent=4)
    print("$config.json created successfully")