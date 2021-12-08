kofiWidgetOverlay.draw('matoi', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support Us',
    'floating-chat.donateButton.background-color': '#ffffff',
    'floating-chat.donateButton.text-color': '#323842'
},
"kofi-btn");


overlay_height=getComputedStyle(document.querySelector(':root')).getPropertyValue('--kofi-overlay-height');
kofiOverlay=document.getElementsByClassName("floating-chat-kofi-popup-iframe")[0]
window.setInterval(()=>{
    if (kofiOverlay.style.height!=='0px'){
        kofiOverlay.style.height=overlay_height
    }
},1)

// main=document.getElementById('main_body')
// widget={
//     id:null,
//     element:null
// }
// for (let index = 0; index < main.children.length; index++) {
//     const div = main.children[index];
//     if (div.id.includes('kofi-widget-overlay')){
//         widget.id=div.id
//         widget.element=div
//         main.removeChild(div)
//     }
// }

// navInfo=document.getElementsByClassName('info')[0]
// navInfo.appendChild(widget.element)
// kofiwidget2.init('Support Us!', '#00b3ff', 'M4M620541');
// kofiwidget2.draw();


// console.log(widget)