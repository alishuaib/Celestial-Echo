//Utility Function: Compare last element of string
const checkLastSplit=(split_, str1_ ,str2_)=>{
   if (str1_.split(split_).slice(-1)[0]==str2_.split(split_).slice(-1)[0]){
      return true;
   }
   else{
      return false;
   }
}

//Utility Function: Enable/Disable a image button of a certain class and Check state
var src_play="res/play.svg"
var src_pause="res/pause.svg"
const btn_states={
   'img_next':"res/next.svg",
   'img_nextd':"res/nextd.svg",
   'img_back':"res/back.svg",
   'img_backd':"res/backd.svg",
}
const toggleBtn=(id_)=>{
   let element=document.getElementById(id_);
   let elementf=document.getElementById(id_+"f");
   let elementin=document.getElementById(id_+"in");
   if (checkLastSplit('/',element.src,btn_states[id_])){
      element.src=btn_states[id_+'d']
      elementf.style.visibility='hidden';
      elementin.style.visibility='hidden';
      element.parentNode.classList.remove("anim_"+id_)
   }
   else{
      element.src=btn_states[id_]
      elementf.style.visibility='visible';
      elementin.style.visibility='visible';
      element.parentNode.classList.add("anim_"+id_)
   }
}
const isBtnDisabled=(id_)=>{
   let element=document.getElementById(id_);
   if (checkLastSplit('/',element.src,btn_states[id_+'d'])){
      return true
   }
   else{
      return false
   }
}

//Utility Function: Get the degree at which a click occurs on the !semi-circle!
const pointDeg=(circle,mEvent)=>{
   //Offset and Radius
   var offset = { x: -1*circle.clientWidth, y: circle.getBoundingClientRect().top};
   var radius=circle.clientHeight/2
   //Mouse Position in object
   var mPos = {x: mEvent.clientX-offset.x, y: mEvent.clientY-offset.y};
   //Calculate Degree (0-360)
   var atan = Math.atan2(mPos.x-radius, mPos.y-radius);
   deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
   return deg;
}

//Update list of current songs
let song_list=new Array()
const updateSongs= (sync=false)=>{
   var raw_list=document.getElementById("song-list").children
   song_list=new Array();
   for (let i = 0; i < raw_list.length; i++) {
      song_list.push(raw_list[i].id);      
   }
   if (sync){
      syncState(song_list.indexOf(song_data.name))
   }
   return song_list;
}

//Format Time to 0:00/0:00 look
const fmtTime=(ctime,duration)=>{
   return new Date(ctime * 1000).toISOString().substr(14, 5) +" / "+ new Date(duration * 1000).toISOString().substr(14, 5)
}

//Sound Controller
let SONG_ID=null //Store the unique ID for current song to allow control
let current_song=null // Store the howler.js song
var tsratio=null //Duration to 180 deg ratio

let song_data={ // Store all Song Data
   element:null,
   server:null,
   name:null,
   artist:null,
   duration:null,
   art:null,
   isEnd:false,
   isStart:false,
   set_element:(div)=>{ //Initialize Data 
      song_data.art=div.children[0].src
      song_data.name=div.children[1].innerHTML;
      song_data.artist=div.children[2].innerHTML;      
      song_data.isEnd=false;
      song_data.isStart=false;
      song_data.element=div;
   },   
   set_duration:(song)=>{ //Initialize Duration once song is loaded
      song_data.duration=song.duration();
   },
}

const handleAudio=(song)=>{
   if (current_song!=null){
      console.log("Unloading Song");
      current_song.unload();
   }
   current_song=song;
   console.log(song_data)
   disc_change.play()
   SONG_ID=current_song.play();
   song_data.isStart=true;
   updateSongs(sync=true); 
   npupdate(song_data.name,song_data.artist);     
}

//Now Playing Song Details Update NOTE: Disc Album art change happens in animation.js
const npupdate=(song_name,song_artist)=>{
   var nptitle=document.getElementById("npsong");
   // var npartist=document.getElementById("npartist");
   nptitle.innerHTML=song_name;
   // npartist.innerHTML=song_artist;
}


//Set up Animations for progress bar
let barPath=anime.path('#shadow-bar path');
let cursor_seek=null
let done_seek=null

const setBar=()=>{
   if (cursor_seek!==null){
      cursor_seek.pause();
      cursor_seek.seek(0);
      //done_seek.seek(0)
   }
   
   tsratio=song_data.duration/180  
   //Line Completion Path
   done_seek=anime({
      targets: '#progress-bar path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      duration: song_data.duration*1000,  
      loop:false,
      autoplay:false,
      begin:()=>{
         document.getElementById('progress-bar').style.visibility='visible';     
         document.getElementById('shadow-bar').style.opacity=100;     
      }
   });  
   //Cursor Path Follow Animation
   cursor_seek=anime({
      targets: '#cursor-bar',
      translateX: barPath('x'),
      translateY: barPath('y'),
      rotate:barPath('angle'),
      easing: 'linear',
      duration: song_data.duration*1000,
      loop: false,
      autoplay:true,
      begin:()=>{
         document.getElementById('cursor-bar').style.visibility='visible';                
      },
      update:()=>{
         var ts=current_song.seek(SONG_ID);
         if (ts==0 && song_data.isEnd){return}
         if (ts==0 && song_data.isStart){return}
         done_seek.seek(current_song.seek(SONG_ID)*1000);
         var npartist=document.getElementById("npartist");
         npartist.innerHTML=fmtTime(ts,song_data.duration)
      },
   });

    

   //Seeker click and drag handler
   

   //Used to calculate progress bar location in ratio to width and duration    
   let isDown=false;
   const demo=document.querySelector('#bar-container')

   

   function mDown(event){
      isDown=true; 
      moveAt(event);      
      current_song.pause(SONG_ID);
   }

   function mUp(event){
      isDown=false;
      if (current_song.seek(SONG_ID)<song_data.duration-1 && media_state==false &&btn_state_paused==false && song_data.isEnd!=true){
         current_song.play(SONG_ID)
         cursor_seek.play()
      }
   }

   function mMove(event){
      event.preventDefault();
      if (isDown) {    
         moveAt(event)
      }
   }

   function moveAt(e){ //Main Move function, done using ratio
      var deg=pointDeg(document.querySelector('#progress-bar'),e)
      //console.log(deg,deg*tsratio)
      current_song.seek(deg*tsratio,SONG_ID);
      cursor_seek.pause();
      cursor_seek.seek(current_song.seek(SONG_ID)*1000);
   }

   //Reset Event Listeners
   demo.removeEventListener('mousedown',mDown,true);
   document.removeEventListener('mouseup',mUp)
   document.removeEventListener('mousemove', mMove, true);

   //Mouse down only detected on custom bar div
   demo.addEventListener('mousedown',mDown,true);  

   //Mouse up and Mouse Move event detected on entire site to ensure consistency and stability
   document.addEventListener('mouseup',mUp)
   document.addEventListener('mousemove', mMove, true);
}

//Grab song on click for each div and load it up
const loadSong=(element,data)=>{
   console.log("Clicked on DIV with ID",element.id)
   if (cursor_seek!==null){
      cursor_seek.pause()
   }

   howl=new Howl({
      src:['res/audio/'+data.file],
      onend:()=>{
         song_data.isEnd=true;
         if (isBtnDisabled('img_next')!=true){
            document.querySelector('.next').onclick();
         }
      },
      onload:()=>{
         console.log('loaded')
         song_data.set_duration(howl);
         setBar();
      },
      onplay:()=>{
         console.log('play')
      }
   });
   song_data.set_element(element) 
   song_data.server=data
   handleAudio(howl)
}

//Constantly check if audio is playing
let media_state=false
window.setInterval(()=>{
   if (current_song!=null){
      if(current_song.playing() && media_state==false){
         
         //console.log("Playing")
         media_state=true;
         disc_rotate.play();
         document.getElementById("img_play").src=src_pause
      }
      else if (current_song.playing()!=true && media_state==true){
         
         //console.log("Not Playing")
         media_state=false;
         disc_rotate.pause();
         document.getElementById("img_play").src=src_play
      }
   }
},1)

//Configure Play Button
let btn_state_paused=false;
const playController=function(){
   if(current_song!=null){      
      play=document.getElementById("img_play");
      if (checkLastSplit('/',play.src,src_pause)){
         current_song.pause()
         console.log("Clicked Pause")
         btn_state_paused=true;
         if (cursor_seek!=null){
            cursor_seek.pause()
         }
      }
      else if (checkLastSplit('/',play.src,src_play)){
         if (song_data.isEnd){
            song_data.element.onclick()
            return
         }
         current_song.play()
         console.log("Clicked Play")
         btn_state_paused=false;
         if (cursor_seek!=null){
            cursor_seek.play()
         }
      }
   }
}
document.querySelector('.playpause').onclick=playController
document.querySelector('#disc-album').onclick=playController

//Configure Forward Button
document.querySelector('.next').onclick=function(){
   if (isBtnDisabled('img_next')!=true){//Check if button is in disabled state
      //Update List of songs
      updateSongs()
      if (cursor_seek!=null){
         cursor_seek.pause()
      }
      if(current_song==null){ //Play the first song if no song is loaded
         document.getElementById(song_list[0]).onclick()  
      }
      else{ //Get current song index and play the next one
         var cIndex=song_list.indexOf(song_data.name)
         document.getElementById(song_list[cIndex+1]).onclick()
      }
   }
}

//Configure Reverse Button
document.querySelector('.back').onclick=function(){
   if (isBtnDisabled('img_back')!=true){//Check if button is in disabled state
      //Find The Current List of Songs
      updateSongs()
      if (cursor_seek!=null){
         cursor_seek.pause()
      }
      if(current_song==null){ //Play the first song if no song is loaded
         document.getElementById(song_list.slice(-1)[0]).onclick()  
      }
      else{ //Get current song index and play the next one
         var cIndex=song_list.indexOf(song_data.name)
         document.getElementById(song_list[cIndex-1]).onclick()
      }
   }
}

//Configure Sync Between Song Selection and Forward Reverse Buttons
const syncState=(cIndex)=>{
   console.log('syncState()',cIndex,song_list.length-1)

   //Sync State of Search and -1 (No Song Found)
   if (cIndex==-1){
      if (song_list.length-1<1){//If songs in list less than 1 (Only a single song or No Songs)
         if(isBtnDisabled('img_next')==false){
            toggleBtn('img_next')
         }
         if(isBtnDisabled('img_back')==false){
            toggleBtn('img_back')
         }
      }
      else{
         if(isBtnDisabled('img_next')){
            toggleBtn('img_next')
         }
         if(isBtnDisabled('img_back')){
            toggleBtn('img_back')
         }
      }
      return;
   }

   //Forward
   if(cIndex>=song_list.length-1){//Check if next song is last 
      console.log("Disabled Now")
      if(isBtnDisabled('img_next')==false){
         toggleBtn('img_next');
      }      
   }else{
      if(isBtnDisabled('img_next')){
         toggleBtn('img_next')
      }
   }

   //Reverse
   if(cIndex<=0){//Check if back song is the first song
      console.log("Disabled Now")
      if(isBtnDisabled('img_back')==false){
         toggleBtn('img_back');
      }
   }else{
      if(isBtnDisabled('img_back')){
         toggleBtn('img_back')
      }
   }
}

//Function to create Song Cards based on given data
const standardPath="res/audio/";
const createSongCard=(sSrc,sTitle,sArtist,data)=>{;
   var tag=document.createElement("div")
   tag.className="song_card"
   tag.id=sTitle
   tag.onclick=()=>{
      loadSong(tag,data)
   };

   var img=document.createElement("img")
   img.src=standardPath+sSrc
   img.className="song_img"

   var title=document.createElement("p")
   title.appendChild(document.createTextNode(sTitle))
   title.className="song_title"

   var artist=document.createElement("p")
   artist.appendChild(document.createTextNode(sArtist))
   artist.className="song_artist"

   tag.appendChild(img)
   tag.appendChild(title)
   tag.appendChild(artist)
   return tag
}

//Fetch song files onload and create the cards
window.onload=function(){
   //Fetch song list from API and add to array of songs
   fetch(window.origin+'/api/albums/Genshin Impact - The Stellar Moments').then((res)=>{
      return res.json();
   }).then((data)=>{
      song_cards=new Array()
      data.forEach((v)=>{
         song_cards.push(createSongCard(v.art,v.name,v.artist,v))
      })
      
      var listNode=document.getElementById("song-list")      
      song_cards.forEach((v=>{
         listNode.appendChild(v)
      }))

      console.log(`Successfully Loaded ${data.length} Songs`);
   }).catch((err)=>{
      console.log("Something went wrong",err);
   })  
}

let song_cards=[]
//Search song files when requested
const searchSongs=(query)=>{   
   let result_cards=[]
   song_cards.forEach((item,index)=>{
      if(item.tagName=="DIV"){
         if (item.id.toLowerCase().includes(query.toLowerCase()) || query=="" ){
            result_cards.push(item)
         }   
      }           
   })

   let listNode=document.getElementById('song-list')
   listNode.innerHTML=""
   result_cards.forEach(v=>{
      listNode.appendChild(v)
   })
}

let searchIN=document.getElementById("search_input")
searchIN.value=""
searchIN.addEventListener('input',(e)=>{
   searchSongs(e.target.value)
})






