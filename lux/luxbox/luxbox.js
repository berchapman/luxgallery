//psuedo-globals
var filesArray = getFilesArray();
var imagesFolder = document.getElementById('lux_data_imagesFolder').innerHTML;
var jsonImages = document.getElementById('lux_data_imageDimensions').innerHTML;
jsonImages = JSON.parse(jsonImages);

function getFilesArray(){
    var filesArray = document.getElementById('lux_data_files').innerHTML;
    return filesArray.split("␇");
};


//NOTE: CURRENT is only set by the setImage() function. It keeps track of what the current displayed picture is.
var CURRENT = null;

//SETTINGS
//These values can be set.
var CLICKEXACT = false;      /* When set to false; clicking anywhere in the subdiv will pop up the luxbox. When set to true, the picture itself must be clicked to open the luxbox */

///////////////////////////////


//ADD EVENT LISTENERS
//var imgdiv = document.querySelectorAll('.lux-subdiv');
var imgdiv = document.querySelectorAll('.lux-subdiv');
for(var i = 0; i < imgdiv.length; i++){
    imgdiv[i].addEventListener('click', function(event){ 
        event.preventDefault(); //prevents popup
        galleryImgClick(event); //call img click from gallery
    }, false);
};


//event debounce
var resizeFlag = false;
window.addEventListener('resize', function(){
    //document.getElementById('luxbox-picture').style.opacity = 0.5;
    if(resizeFlag !== false)
        clearTimeout(resizeFlag);
        resizeFlag = setTimeout(callOnResize, 350);
});

function callOnResize() {
    var luxbox = document.getElementById('luxbox'); 
    if( luxbox != null ){
        resizePicture();        
    }

};



function galleryImgClick(event){
    var id = event.srcElement.attributes[0].nodeValue;
    
    if( id == 'lux-link' ){
        if( CLICKEXACT == false ){
            id = event.target.children[0];
            id = id.id;
            y(id);            
        } else {
            return false;
        };
    } else {
        y(id);
    };
};



////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


//NOTE: setImage is the main engine for setting luxbox contents. It sets the image, and calls the resize and title generator - setWords()
function setImage(id){
  
    CURRENT = id;
  
    var imgTag = document.getElementById('luxbox-picture');
    var source = document.getElementById(id).src;
    imgTag.src = source;
    
    setWords();
    resizePicture(id);
};

///

function setWords(){
    
    var id = document.getElementById(CURRENT);
    var titleWords = id.parentNode.parentNode.getElementsByTagName('p')[0].innerHTML;
    var titleSpace = document.getElementById('luxbox-title');
    titleSpace.innerHTML = titleWords;
    
};


//INTERACTION (this function directs all clicks)
function luxboxInteraction(event){
    var luxbox = document.getElementById('luxbox');
    
    if( event.type == 'click' ){ //click events
        if( event.target.id == 'luxbox-left' ){
            leftButton();  
        } else
        if( event.target.id == 'luxbox-right' ){
            rightButton();
        } else 
        if( event.target.id == 'luxbox-exit' ){
            closeLuxbox();
        } else
        if( event.target.id == 'luxbox-picture' || event.target.id == 'luxbox-title' ){
            
        } else 
        if( event.target.id == 'luxbox-container' || 'luxbox' || 'luxbox-subcontainer' ){
            closeLuxbox();        
        };        
    } else //key events
    if( event.type == 'keydown' && luxbox.style.display != 'none' ){
        if( event.keyCode == '37' ){
            leftButton();
        } else
        if( event.keyCode == '39' ){
            rightButton();
        } else
        if( event.keyCode == '27' ){
            closeLuxbox();
        };
    };
};



function animateControlsFadeout(){



};


/////


function createButtons(){
    var exists = document.getElementById('luxbox-left')
    if ( exists == null ){ //if it doesnt exist, make 'em
        var luxbox = document.getElementById('luxbox');
        
        var left = document.createElement('div');
        left.id = 'luxbox-left';
        luxbox.appendChild(left);
        
        var right = document.createElement('div');
        right.id = 'luxbox-right';
        luxbox.appendChild(right);
        
        var exit = document.createElement('div');
        exit.id = 'luxbox-exit';
        luxbox.appendChild(exit);
    };
};



function leftButton(){
    var id = CURRENT;
    
    var num = id.split("_");
    num = num[1]; //get number in images for id
    if( num != 0 ){
        num = num - 1;
    } else {
        num = filesArray.length - 1;
    };
    var newId = 'lux-count_' + num;
    setImage(newId);
};


function rightButton(){
    var id = CURRENT;
    
    var num = id.split("_");
    num = num[1]; //get number in images for id
    if( num != (filesArray.length - 1) ){
        num = (num*1) + 1;
    } else {
        num = 0;
    };
    var newId = 'lux-count_' + num;
    setImage(newId);
};




////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//RESZIING



function resizePicture(id) {
    var pic = document.getElementById('luxbox-picture');
    var width = pic.width;
    var height = pic.height;
    
    var picRatio = width / height;
    
    var body = document.documentElement;
    var clientWidth = body.clientWidth;
    var clientHeight = body.clientHeight;
    
    var clientRatio = clientWidth / clientHeight;
    
    //console.log('picRatio: ' + picRatio);
    //console.log('clientRatio: ' + clientRatio);
    
    //////    

    if( clientRatio > 1 ){ //LANDSCAPE
        if( picRatio > 1 ){                     //landscape
            pic.style.height = '100%';
            pic.style.width = 'auto';

            if( picRatio > clientRatio ){
                pic.style.width = '100%';
                pic.style.height = 'auto';
            };
        };
        
        if( picRatio < 1 || picRatio == 1 ){    //portrait -or- square
            pic.style.height = '100%';
            pic.style.width = 'auto';
        };
        checkForOversize();
    } else {//---------------PORTRAIT -or- SQUARE-----------------------------
        if( picRatio > 1 ){                     //landscape
            pic.style.height = 'auto';
            pic.style.width = '100%';
            
        };
        
        if( picRatio < 1 || picRatio == 1 ){    //portrait -or- square
            pic.style.height = '100%';
            pic.style.width = 'auto';
            
            if( picRatio > clientRatio ){
                pic.style.width = '100%';
                pic.style.height = 'auto';
            }
        };
        checkForOversize();
    };

    
    function checkForOversize(){
        var pic = document.getElementById('luxbox-picture');
        var frame = document.getElementById('luxbox-subcontainer');
        if( pic.width > frame.width ){
            if( clientRatio >= 1 ){ //landscape
                pic.style.width = 'auto';
                pic.style.height = '100%';                
            } else {
                pic.style.width = '100%';
                pic.style.height = 'auto';                    
            };

        };
        if( pic.height > frame.height ){
            if( clientRatio >= 1 ){ //landscape
                pic.style.width = 'auto';
                pic.style.height = '100%';                
            } else {
                pic.style.width = '100%';
                pic.style.height = 'auto';                    
            };
        };
        
    };
    
    triggerRepaint(); //solves bug where picture remains squished after resize
    //note: need to solve bug where pic sometimes is bigger than subcontainer
    
}; //end resizePicture()


function triggerRepaint(){
    var parent = document.getElementById('luxbox-subcontainer');
    var n = document.createTextNode(' ');
    var disp = parent.style.display;  

    parent.appendChild(n);
    parent.style.display = 'none';

    setTimeout(function(){
        parent.style.display = disp;
        n.parentNode.removeChild(n);
    },15);
    //document.getElementById('luxbox-picture').style.opacity = 1;
}


//END RESIZING
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


function closeLuxbox(){
    var luxbox = document.getElementById('luxbox');    
    luxbox.style.display = 'none';
};




function y(id){
    
    var luxbox = document.getElementById('luxbox');
    
    //If luxbox hasn't yet been created
    if( luxbox === null ){
        createLuxbox(id);
    } else {
        luxbox.style.display = 'block';
        setImage(id);
    };
    
    
};




function createLuxbox(id){

    var luxbox = document.createElement('div');
    document.body.appendChild(luxbox);
    luxbox.id = 'luxbox';
    
    var container = document.createElement('div');
    container.id = 'luxbox-container';
    luxbox.appendChild(container);
    
    var subcontainer = document.createElement('div');
    subcontainer.id = 'luxbox-subcontainer';
    container.appendChild(subcontainer);
    
    var pic = document.createElement('img');
    pic.id = 'luxbox-picture';
    subcontainer.appendChild(pic);
    
    var wordsDiv = document.createElement('div');
    wordsDiv.id = 'luxbox-wordsDiv';
    subcontainer.appendChild(wordsDiv);
    
    var title = document.createElement('div');
    title.id = 'luxbox-title';
    wordsDiv.appendChild(title);
    
    
    luxbox.addEventListener('click', function(){
        luxboxInteraction(event);
    }, false);
    
    
    if( typeof document.addEventListener != 'undefined' ){
        document.addEventListener('keydown', function(){
            luxboxInteraction(event); 
        });        
    } else if( typeof document.attachEvent != 'undefined' ){
        document.addEventListener('keydown', function(){
           luxboxInteraction(event); 
        });
    };
    
    
    setImage(id);                                       //call setImage()
    createButtons();                                    //call createButtons()
};

