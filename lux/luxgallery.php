<?php 

include 'LUX_SETTINGS.php';


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


function removeRoot($string){  //removes the root string from the passed in string, allowing for sane filepath manipulation
    $root = $_SERVER['DOCUMENT_ROOT'];
    return str_replace( $root, "", $string );  
};


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


function luxGallery($luxGalleryTitle = ''){
    $currentFolder = removeRoot(getcwd());
    $files = scandir(LUXGALLERYFOLDER);
    $arrayOfFiles = [];
    $arrayOfImages = [];
    $jsonImageDimensions = [];
    
    
    ///////////////////////////////////////////////    
    function getArrayOfImages($files, $arrayOfImages, $arrayOfFiles, $jsonImageDimensions){
        $i = 0;
        foreach( $files as $file ){
            $pos = strrpos($file, '.'); //get position of last period
            $fileExtension = substr($file, $pos);
            $fileName = str_replace($fileExtension,"",$file);
			
			if( strpos($file, '.') !== (int) 0 ){
			
            $imgSize = getimagesize(LUXGALLERYFOLDER.'/'.$file);
            $dimensions = [];
            $dimensions[] = $imgSize[0];
            $dimensions[] = $imgSize[1];
            
            if( $fileExtension == '.png' || $fileExtension == '.jpg' || $fileExtension == '.jpeg' || $fileExtension == '.gif' || $fileExtension == '.tiff' || $fileExtension == '.bmp' ){
                $arrayOfImages[] = $i;
                $arrayOfImages[$i] = $fileName;
                //
                $arrayOfFiles[] = $i;
                $arrayOfFiles[$i] = $file;
                //
                $jsonImageDimensions[] = array(
                    $file => array(
                        'width' => $dimensions[0], 'height' => $dimensions[1]
                    )    
                );
                //
                $i++;                
            };
		};
        };
		
        $return = [];
        $return[0] = $arrayOfImages;
        $return[1] = $arrayOfFiles;
        $return[2] = $jsonImageDimensions;
        return $return;
    };
    ///////////////////////////////////////////////    
    
    
    //step 1
    $return = getArrayOfImages($files, $arrayOfImages, $arrayOfFiles, $jsonImageDimensions);
    $arrayOfImages = $return[0];
    $arrayOfFiles = $return[1];
    $jsonImageDimensions = $return[2];
    
    
    ///////////////////////////////////////////////
    function transferData($arrayOfImages, $arrayOfFiles, $jsonImageDimensions){
        echo '<div id="lux_data_transfer" style="display: none; position: fixed; top: 0; left: 0; margin-left: -200px;">'; 
            echo '<div id="lux_data_imagesFolder" style="display: none;">', LUXGALLERYFOLDER, '</div>';
            echo '<div id="lux_data_imageDimensions" style="display: none;">';
                echo json_encode($jsonImageDimensions);
            echo '</div>';
            echo '<div id="lux_data_files" style="display: none;">';
                foreach($arrayOfFiles as $key => $value){
                  if( $key == (count($arrayOfFiles) - 1)){
                      echo $value;
                  } else {
                      echo $value, ' ';                  
                  };
                };
            echo '</div>';
            echo '<script src="', LUXROOT, '/js/addImages.js"></script>'; //add images
            echo '<script src="', LIGHTBOXPATH, '"></script>'; //lightbox path            
    };   
    ///////////////////////////////////////////////
    
    
    ///////////////////////////////////////////////       
    function generateEmptyGallery($arrayOfImages, $arrayOfFiles, $jsonImageDimensions, $luxGalleryTitle){
        $numberOfImages = count($arrayOfImages);

        echo '<div class="lux-gallery">';
            echo '<div class="lux-gallery-title-div">';
                echo '<h1 class="lux-gallery-title">',$luxGalleryTitle,'</h1>';
            echo '</div>';
            echo '<div class="lux-subcontainer">';
                for($i = 0; $i < $numberOfImages; $i++){
                echo '<div class="lux-div">';
                    echo '<div class="lux-subdiv">';
                        echo '<a class="lux-link" href="', LUXGALLERYFOLDER, '/', $arrayOfFiles[$i], '">';
                            echo '<img id="lux-count_', $i, '" class="lux-thumb" src="', LUXROOT, '/assets/', LUXLOADING, '">';
                        echo '</a>';
                        echo '<p class="lux-title">', $arrayOfImages[$i], '</p>';
                    echo '</div>';
                echo '</div>';                    
                };                      //end foreach
            echo '</div>';
        transferData($arrayOfImages, $arrayOfFiles, $jsonImageDimensions);       //Call transferData ( step 3 )
        echo '</div>';            
    };
    ///////////////////////////////////////////////
    
    
    generateEmptyGallery($arrayOfImages, $arrayOfFiles, $jsonImageDimensions, $luxGalleryTitle); //step 2

    
    
    //THIS IS THE CODE TO GENERATE GALLERY AND IMAGES ALL AT ONCE
    /*
    function generateImageDiv($file, $fileName, $currentFolder){
        echo '<div class="lux-div">';
            echo '<div class="lux-subdiv">';
                echo '<a class="lux-link" href="', $currentFolder, '/', LUXGALLERYFOLDER, '/', $file, '">';
                    echo '<img class="lux-thumb" src="', $currentFolder, '/', LUXGALLERYFOLDER, '/', $file, '">';
                echo '</a>';
                echo '<p class="lux-title">',$fileName,'</p>';
            echo '</div>';
        echo '</div>';
    };    
    //Gallery
    echo '<div class="lux-gallery">';
        echo '<div class="lux-gallery-title-div">';
            echo '<h1 class="lux-gallery-title">',$luxGalleryTitle,'</h1>';
        echo '</div>';
        echo '<div class="lux-subcontainer">';
            foreach( $files as $file ){
                $pos = strrpos($file, '.'); //get position of last period
                $fileExtension = substr($file, $pos);
                $fileName = str_replace($fileExtension,"",$file);
                
                if( $fileExtension == '.png' || $fileExtension == '.jpg' || $fileExtension == '.jpeg' || $fileExtension == '.gif' || $fileExtension == '.tiff' || $fileExtension == '.bmp' ){
                    generateImageDiv($file, $fileName, $currentFolder);
                };
            };
        echo '</div>';
    echo '</div>';
    */
    
};











?>