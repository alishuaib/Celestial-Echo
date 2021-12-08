//Keep animations playing even when tab is changed
anime.suspendWhenDocumentHidden = false;
//Disc Rotation Animation
var rot=false;
var disc_rotate=anime({
    // targets: '#disc-container .disc',
    targets: '#disc-spinner',
    rotate:{
      value: '360',
      easing: 'linear',
      duration:10000,
    },
    autoplay:false,
    loop:true,
    update: function(){
        rot=true
    }
});

var ps_state=false

//Disc Phase Shift [Side -> Center]
// var disc_p2=anime({
//     targets: '#disc-container',
//     translateX:{
//         value: window.innerWidth / 2
//     },
//     easing:'easeInOutElastic(1,.6)',
//     autoplay:false,
//     complete:function(){        
//         disc_p2.reverse()
//         ps_state=(!ps_state)
//     }
// }); 

//Song Menu Phase Shift
var menu_move=anime({
    targets:'#song-container',
    autoplay:false,
    translateX:{
        value: window.innerWidth-document.getElementById('hide_btn').getBoundingClientRect().right
    },
    easing:'easeInOutElastic(1,.6)',
    complete:function(){
        menu_move.reverse()        
    }
})

//Media Opacity Phase Shift
var media_hide=anime({
    targets:'#media-container',
    autoplay:false,
    opacity:0,
    easing:'linear',
    duration:800,
    complete:function(){
        media_hide.reverse()
    }
})

var change=0
//Disc Track Change 
var disc_change=anime({
    targets:'#disc-move',
    autoplay:false,
    translateX:{
        value: -1*(document.getElementById("disc-container").clientHeight)
    },
    easing:'easeInOutElastic(1,.6)',
    changeComplete:function(){
        change+=1
    },
    complete:function(){
        disc_change.reverse();
        //document.getElementById("disc-container").style.visibility='visible';
        document.getElementById("disc-move").style.visibility='visible';
        console.log(song_data.art.split("/res")[1])
        document.getElementById("disc-album").style.backgroundImage=`url(../res${song_data.art.split("/res")[1]})`;
        if (change%2!=0){            
            disc_rotate.restart()
            disc_change.play()
        }
    }
})