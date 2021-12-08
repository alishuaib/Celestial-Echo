import os
from os import listdir
from os.path import isfile, join,isdir

from pathlib import Path



mypath=Path(__file__).parent
albums=[f for f in listdir(mypath) if isdir(join(mypath, f))]
index=input("Select Album:\n"+"".join(str(i+1)+"| "+f+"\n" for f,i in zip(albums,range(len(albums))) if isdir(join(mypath,f)))+">> ")
mypath=mypath/albums[int(index)-1]

onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

def rmClip(symS,symE,inStr):
    newStr=""
    removing=False
    for c in inStr:
        if c==symS and not removing:
            removing=True
        
        if not removing:
            newStr+=c

        if c==symE and removing:
            removing=False
            symS="Done Clipping"
    return newStr


def fmt(inStr,ext):
    if inStr.endswith(ext): 
        return True,rmClip('(',')',inStr[4:].replace(ext,"")).strip()+ext    
    return False,"\tIncorrect Extension"  

for file in onlyfiles:
    res=fmt(file,'.mp3')
    print(res)
    if res[0]:
        os.rename(join(mypath.parent,file),join(mypath.parent,res[1]))