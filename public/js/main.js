//Src for images
// var src_play="res/play.svg"
// var src_pause="res/pause.svg"
// var src_next="res/next.svg"
// var src_nextD="res/nextd.svg"
// var src_back="res/back.svg"
// var src_backD="res/backd.svg"




// document.getElementById('hide_btn').onclick = function(){
//     if (ps_state==false){
//         media_hide.play()
//         menu_move.play();
//         disc_p2.play();
//         document.getElementById('hide_btn').textContent="<<"
//     }else{        
//         disc_p2.play();
//         menu_move.play();
//         media_hide.play();
//         document.getElementById('hide_btn').textContent=">>"
//     }    
// };

//PlayPause Media Controls
//var song_list=["hyper.mp3","Qilin's Prance.mp3"];

// var media=[]
// var cmedia=0
// function loadMedia(){
//     media_state=true;    
//     for (song in song_list) {
//         howl=new Howl({
//             src:['res/audio/'+song_list[song]]
//         });
//         media.push(howl);
//     }
// }


// next=document.getElementById("img_next");
// play=document.getElementById("img_play");
// back=document.getElementById("img_back");
// disc_play=document.querySelector('#disc-container .disc').onclick

// function visualsync(){
//     if (media==[]){
//         console.log('No Sync')
//         document.getElementById("img_play").src=src_play
//         disc_rotate.pause();
//         rot=false;
//     }
//     if (media[cmedia].playing()){
//         media[cmedia].pause()
//         document.getElementById("img_play").src=src_play
//         disc_rotate.pause();
//         rot=false;
        
//     }
//     else{
//         media[cmedia].play()
//         document.getElementById("img_play").src=src_pause
//         disc_rotate.play();
//     }
// }



// document.querySelector('.next').onclick=function(){
//     if (media==[]){
//         console.log('No Song Loaded')
//     }else{        
//         if (next.alt=="disabled"){
//             console.log("Disabled")
//             return
//         }
//         media[cmedia].stop()
//         cmedia+=1        
//         media[cmedia].play()
//         disc_change.play()
//         play.src=src_pause
//         if ((cmedia== media.length-1)){
//             next.src=src_nextD;
//             next.alt="disabled"
//             if((cmedia>0)){
//                 back.src=src_back;
//                 back.alt="back"
//             }
//         }
//         else{
//             next.src=src_next;
//             next.alt="next"
//             if((cmedia>0)){
//                 back.src=src_back;
//                 back.alt="back"
//             }
//         }
//     }   
// }
// document.querySelector('.back').onclick=function(){
//     if (media==[]){
//         console.log('No Song Loaded')
//     }else{
//         if (back.alt=="disabled"){
//             console.log("Disabled")
//             return
//         }
//         media[cmedia].stop()
//         cmedia-=1        
//         media[cmedia].play()
//         disc_change.play()
//         play.src=src_pause
//         if ((cmedia== 0)){
//             back.src=src_backD;
//             back.alt="disabled"
//             if((cmedia<media.length-1)){
//                 next.src=src_next;
//                 next.alt="next"
//             }
//         }
//         else{
//             back.src=src_back;
//             back.alt="back"
//             if((cmedia<media.length-1)){
//                 next.src=src_next;
//                 next.alt="next"
//             }
//         }
//     }   
// }
    
