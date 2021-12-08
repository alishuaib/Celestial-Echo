//To start run command: npm run dev
const express=require('express');
const path=require('path');
const glob=require('glob');
const fs=require('fs')
const { PassThrough } = require('stream');
const e = require('express');
const { config } = require('process');
const app=express();

let songs=[]
let albums=[]
//Api to Song list
app.get('/api/songs',(req,res)=>{
    res.json(songs)
});

app.get('/api/albums',(req,res)=>{
    res.json(albums)
});

app.get('/api/albums/:album',(req,res)=>{
    results=[]
    if(isInt(req.params.album)){
        loadSongs('public/res/audio/'+albums[parseInt(req.params.album)].name,albums[parseInt(req.params.album)].artist)
    }else{
        albums.forEach(v=>{
            if(v.name==req.params.album){
                loadSongs('public/res/audio/'+req.params.album,v.artist)
            }
        })        
    }    
    songs.forEach((item,index)=>{
        results.push(item)        
    })
    res.json(results)
});

app.get('/api/songs/:song',(req,res)=>{
    results=[]
    songs.forEach((item,index)=>{
        if (item.name.toLowerCase().includes(req.params.song.toLowerCase())){
            results.push(item)
        }        
    })
    res.json(results)
});

//Static Server Hosted on port 5000 ()
app.use(express.static(path.join(__dirname,'public')));

const PORT=5002
app.listen(PORT, ()=> `Server Running on port ${PORT}`)

//Utility Function: Validate a file with given extensions and return commonly needed data
const ext=(valid,file)=>{
    let returnVal={validate:false,ext:null,name:null}
    valid.forEach((v)=>{        
        if (file.endsWith(v)){
            returnVal={validate:true,ext:v,name:file.replace(v,"")};
        }
    });
    return returnVal;
}
//Utility Function: Check if string is integer
function isInt(value) {
    return !isNaN(value) && 
        parseInt(Number(value)) == value && 
        !isNaN(parseInt(value, 10));
}

//Check for album or song art in given directory
var checkArt=function (filepath,name){
    let album_art=""
    fs.readdirSync(path.join(filepath,'..')).forEach(file => {
        let temp_art=""
        check=ext([".png",".jpg",".svg"],file)
        if(check.validate){
            if (check.name==name){
                album_art=file;
                return;
            }
            else if(check.name=="album_art"){
                temp_art=file;
            }            
        }
        if (album_art==""){
            album_art=temp_art
        }
    });
    return album_art;
}

//Load Directory's
const getDirectories = function (src) {
    return glob.sync(path.join(__dirname,src + '/**/*'));
};
const getFolders=(src)=>{
    dirs=fs.readdirSync(src, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    return dirs;
}
//Load Config
const loadConfig=(dir)=>{
    try{
        data=JSON.parse(fs.readFileSync(dir+"/config.json"))
    }
    catch (e){
        return null
    }
    return data    
}
const loadAlbums=()=>{
    getFolders('public/res/audio').forEach((v)=>{
        try{
            let config=loadConfig('public/res/audio/'+v)
            config.art='res/audio/'+v+"/"+checkArt('public/res/audio/'+config.name+"/FILLER")
            albums.push(config)
        }catch(e){
            console.log(e)
        }
    })
}

//Load songs from static public/res/audio by looking for audio extensions
const loadSongs=(dir='public/res/audio',album_artist="Unknown")=>{
    songs=[]
    let dirs=getDirectories(dir)
    dirs.forEach(function (v) {
        if (false) {
            console.log('Error', err);
        } else {
            try{
                var val=v.split("/")                    
                let check=ext(['.mp3','.m4a'],val[val.length-1])
                if(check.validate){
                    //Get Art from inside folder       
                    var art=checkArt(v,check.name)         
                    var obj={
                        name:check.name,
                        file:v.split('audio/')[1],
                        art:path.join(v,'..',art).split('audio/')[1].replace('\\','/'),
                        artist:album_artist
                    }                    
                    songs.push(obj)   
                }
            }catch(e){
                console.log(path.join(v,'..',art))
                throw e;
            }
        }
    })
    // getDirectories(dir, function (err, res) {
    //     if (err) {
    //         console.log('Error', err);
    //     } else {
    //         try{
    //             console.log(res.length)
    //             var ns=[]
    //             res.forEach((v)=>{
    //                 var val=v.split("/")                    
    //                 let check=ext(['.mp3','.m4a'],val[val.length-1])
    //                 if(check.validate){
    //                     //Get Art from inside folder       
    //                     var art=checkArt(v,check.name)         
    //                     var obj={
    //                         name:check.name,
    //                         file:v.split('audio/')[1],
    //                         art:path.join(v,'..',art).split('audio\\')[1].replace('\\','/'),
    //                         artist:"Unknown"
    //                     }
                        
    //                     ns.push(obj)
    //                     song=ns                
    //                 }
    //             })
    //         }catch(e){
    //             throw e;
    //         }
    //     }
    // });    
}

//Load Up all songs and albums on start
loadAlbums()
loadSongs()
