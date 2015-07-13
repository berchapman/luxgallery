//psuedo-globals
var frame = document.getElementById('lux-count_0').width;
var filesArray = getFilesArray();
var imagesFolder = document.getElementById('lux_data_imagesFolder').innerHTML;
var jsonImages = document.getElementById('lux_data_imageDimensions').innerHTML;
jsonImages = JSON.parse(jsonImages);

function getFilesArray(){
    var filesArray = document.getElementById('lux_data_files').innerHTML;
     
        
    return filesArray.split("␇");        
    
};
///////////////////////////////




/////////////////////////////////////////////////////////////
function MASTER(){
    resizeThumbnails();      //step 1
    addImages();             //step 2
};
MASTER();
/////////////////////////////////////////////////////////////


function getPic(i){
    var id = document.getElementById('lux-count_'+i);
    return id;
};



function addImages(){
    for(var i = 0; i < filesArray.length; i++){
        var id = 'lux-count_' + i;
        var el = document.getElementById(id);
        el.src =  imagesFolder + '/' + filesArray[i];
        var parent = el.parentNode;
        parent = parent.parentNode;
        parent.className = parent.className + " lux-subdiv-afterload";
    };
};


function resizeThumbnails(){
    for(var i = 0; i < jsonImages.length; i++ ){
        var image = jsonImages[i];
        var width = image[ filesArray[i] ].width;
        var height = image[ filesArray[i] ].height;
        var pic = getPic(i);
                
        if( width >= height ){       //landscape (or square)
          pic.className += ' wide-thumb';
            if (width !== height){ //if landscape (not square)
                var helper = document.createElement("span");
                var parent = pic.parentNode;
                parent.appendChild(helper);
                helper.className = helper.className + "lux-helper";
            };
        } else {                    //portrait
          pic.className += ' tall-thumb';
        };
    };
};


