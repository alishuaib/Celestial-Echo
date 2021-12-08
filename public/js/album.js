const cssVar=getComputedStyle(document.body)

let nav=document.getElementById("nav")
let nav_top=nav.style.top
document.addEventListener('mouseout',(mEvent)=>{
    if (mEvent.clientY<nav.getBoundingClientRect().bottom){
        if(overlay_state==false){
            nav.classList.remove("dropdown")
            nav.style.top="0%"
            // overlay.style.height=`calc(100vh - ${cssVar.getPropertyValue('--padding-nav')})`
            // overlay.style.height=`calc(100vh - ${nav.getBoundingClientRect().top})`
        }        
    }
})

document.addEventListener('mousemove',(mEvent)=>{
    if (mEvent.clientY>nav.getBoundingClientRect().bottom){
        if(overlay_state==false){
            nav.classList.add("dropdown")
            nav.style.top=nav_top
        }        
    }
})

window.setInterval(()=>{
    overlay.style.height=`calc(100vh - ${nav.getBoundingClientRect().bottom}px)`
},1)


let album_cont=document.getElementsByClassName("album_container")[0]
let songs_cont=document.getElementsByClassName("asongs_container")[0]
const horizontal_scroll=(e,self)=>{
    self.scrollLeft +=e.deltaY*80
    e.preventDefault();
}
album_cont.addEventListener('wheel',(e)=>{horizontal_scroll(e,album_cont)})
songs_cont.addEventListener('wheel',(e)=>{horizontal_scroll(e,songs_cont)})


// let album=document.getElementsByClassName("a_album")
// for (const key in album) {
//     if (album[key].tagName=="DIV"){
//         album[key].addEventListener("mouseover",(mEvent)=>{
//             album[key].childNodes[1].style.opacity=100;
//         })
//         album[key].addEventListener("mouseleave",(mEvent)=>{
//             album[key].childNodes[1].style.opacity=0;
//         })
//     }
// }

let overlay=document.getElementById("album_overlay")
let overlay_clickbox=document.getElementById("a_bar")
let overlay_arrow=document.getElementById("overlay_arrow")
overlay.style.height=`calc(100vh - ${nav.getBoundingClientRect().bottom}px)`
let init_width=overlay.style.width
let overlay_state=false
overlay_clickbox.onclick=(e)=>{
    if (overlay_state){
        overlay_state=false
        album_cont.style.opacity=0
        songs_cont.style.opacity=0
        overlay.style.width=""   
        overlay.style.paddingTop=""  
        nav.style.top=nav_top
        overlay_arrow.style.rotate="0deg"
    }
    else{
        overlay.style.paddingTop=`calc(${cssVar.getPropertyValue('--padding-nav')} + ${cssVar.getPropertyValue('--height-nav') })`
        overlay_state=true
        overlay.style.width="100%"
        album_cont.style.opacity=100
        songs_cont.style.opacity=100
        nav.style.top="0%"
        overlay_arrow.style.rotate="180deg"
    }
    
}

const createAlbumSongCard=(sData)=>{
    var tag=document.createElement("div")
    tag.className="asong_card"
    tag.id=sData.name
    // var obj={
    //     name:check.name,
    //     file:v.split('audio/')[1],
    //     art:path.join(v,'..',art).split('audio\\')[1].replace('\\','/'),
    //     artist:"Unknown"
    // }
    tag.onclick=()=>{
       loadSong(tag,sData)
    };
 
    var img=document.createElement("img")
    img.src=standardPath+sData.art
    img.className="song_img"
    
 
    var title=document.createElement("p")
    title.appendChild(document.createTextNode(sData.name))
    title.className="song_title"
 
    var artist=document.createElement("p")
    artist.appendChild(document.createTextNode(sData.artist))
    artist.className="song_artist"
 
    tag.appendChild(img)
    tag.appendChild(title)
    tag.appendChild(artist)
    return tag
}

//Create album card
const createAlbumCard=(data)=>{;
    var tag=document.createElement("div")
    tag.className="a_album"
    tag.id=data.name
    tag.style.backgroundImage=`url("${data.art}")`
    

    var info=document.createElement("div")
    info.className="a_info"
    info.onclick=()=>{
        var listNode=document.getElementById("a_songs")  
        if(listNode.dataset.album!==tag.id){     
            album_list.forEach((album)=>{
                if(album.name==tag.id){
                    fetch(window.origin+'/api/albums/'+tag.id).then((res)=>{
                        return res.json();
                    }).then((data)=>{
                        var album_songs=[]
                        data.forEach((s)=>{
                            album_songs.push(createAlbumSongCard(s))
                        })
                        
                        listNode.innerHTML='';   
                        listNode.dataset.album=tag.id
                        listNode.scrollLeft=0;
                        album_songs.forEach((v)=>{
                            listNode.appendChild(v);
                        })
                        listNode.style.opacity=100
                        console.log(`Successfully Loaded ${album_songs.length} Songs from this Album`);

                        song_cards=new Array()
                        data.forEach((v)=>{
                            song_cards.push(createSongCard(v.art,v.name,v.artist,v))
                        })
                        listNode=document.getElementById("song-list")  
                        listNode.innerHTML='';    
                        song_cards.forEach((v=>{
                            listNode.appendChild(v)
                        }))
                        updateSongs(true)
                        console.log(`Successfully Searched and Loaded ${data.length} Songs`);
                    }).catch((err)=>{
                        console.log("Something went wrong",err);
                    })
                    
                }
            })
        }
    };

    var songTitle=document.createElement("div")
 
    var img=document.createElement("img")
    img.src="res/temp_play.png"
    img.className="a_play"
    img.onclick=()=>{
        overlay_clickbox.onclick()
    }
 
    var title=document.createElement("p")
    title.appendChild(document.createTextNode(data.name))
    title.className="a_title"
 
    var artist=document.createElement("p")
    artist.appendChild(document.createTextNode(data.artist))
    artist.className="a_artist"

    var count=document.createElement("p")
    count.appendChild(document.createTextNode(data.count + " Songs"))
    count.className="a_count"

    songTitle.appendChild(title)
    songTitle.appendChild(artist)
    info.appendChild(songTitle)
    info.appendChild(count)
    info.appendChild(img)
    tag.appendChild(info)
    return tag
 }
let album_list=[]
//Get Album data when requested
const requestAlbums=()=>{
    fetch(window.origin+'/api/albums/').then((res)=>{
       return res.json();
    }).then((data)=>{
       album_list=data;
       var album_cards=new Array()
       data.forEach((v)=>{
            album_cards.push(createAlbumCard(v))
       })
       var listNode=document.getElementById("a_albums")  
       listNode.innerHTML='';    
       album_cards.forEach((v=>{
          listNode.appendChild(v)
       }))
       console.log(`Successfully Loaded ${data.length} Albums`);
    }).catch((err)=>{
       console.log("Something went wrong",err);
    })
 }
 requestAlbums()