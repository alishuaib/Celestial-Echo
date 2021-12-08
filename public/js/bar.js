// //Main audio source
// var audio=document.getElementById('player');

// //Used to calculate progress bar location in ratio to width and duration
// const canvas = document.querySelector('#demo-svg')
// let tsratio=audio.duration/canvas.clientWidth 

// //Basic Pause and Play functions
// let state=false;
// $('#play').on('click', function() {    
//     audio.play()
//     seekbar.play()
//     state=true;
// });

// $('#pause').on('click', function() {
//     document.getElementById('player').pause();
//     seekbar.pause()
//     state=false;
// });

// //Update Per Second of audio played roughly, only used to update progress bar and current time, irrelevant to custom bar functionality 
// $('#player').on('timeupdate', function() {
//     $('#seekbar').attr("value", this.currentTime / this.duration);
//     document.getElementById('time').textContent=new Date(Math.ceil(this.currentTime) * 1000).toISOString().substr(14, 5)+" | "+new Date(Math.ceil(this.duration) * 1000).toISOString().substr(14, 5);
    
// });

// //SVG Motion path animation set up, check index.html and style.css for reference on set up
// let path = anime.path('#demo-svg path');
// let seekbar=anime({
//   targets: '#sq',
//   translateX: path('x'),
//   translateY: path('y'),
//   rotate: path('angle'),
//   easing: 'linear',
//   duration: document.getElementById('player').duration*1000,
//   loop: false,
//   autoplay:false,
//   update:()=>{
//     trail.seek(audio.currentTime*1000);
//     circbar.seek(audio.currentTime*1000);
//     circseek1.seek(audio.currentTime*1000);
//     circseek2.seek(audio.currentTime*1000);
//   }
// })



// //Patch for animation pausing on tab change, reseek based on audio time
// window.onfocus=()=>{
//   seekbar.pause();
//   seekbar.seek(audio.currentTime*1000)
//   if (state && audio.currentTime<audio.duration-1){
//     audio.play()
//     seekbar.play()
//   }
// }

// //Seeker click and drag handler
// const demo=document.querySelector('.demo-wrapper')
// const rect = demo.getBoundingClientRect()

// let isDown=false;

// //Mouse down only detected on custom bar div
// demo.addEventListener('mousedown',(event)=>{
//   console.log('Mouse Down')
//   isDown=true; 
//   moveAt(event.pageX- rect.left);//Seek to click location
//   audio.pause()
// },true);

// function moveAt(x){ //Main Move function, done using ratio
//   audio.currentTime=x*tsratio;
//   seekbar.pause();
//   seekbar.seek(audio.currentTime*1000);
// }

// //Mouse up and Mouse Move event detected on entire site to ensure consistency and stability
// document.addEventListener('mouseup',(event)=>{
//   console.log('Mouse Up')
//   isDown=false;
//   if (state && audio.currentTime<audio.duration-1){
//     audio.play()
//     seekbar.play()
//   }
// })

// document.addEventListener('mousemove', function(event) {
//   event.preventDefault();
//   if (isDown) {    
//     moveAt(event.pageX- rect.left);
//   }
// }, true);
