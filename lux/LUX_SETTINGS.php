<?php




/* Set folder(s) for gallery images */
define('LUXGALLERYFOLDER', 'images');



/* Set absolute path to lux */
define('LUXROOT', '/lux');


/* Set loading animation for gallery thumbs */
define('LUXLOADING', 'loading.gif');



/* Set lightbox */
// Set the block following this value to false if not using luxbox
define('LIGHTBOXPATH', LUXROOT.'/luxbox/luxbox.js');


/* Use luxbox for the lightbox effect? */
// Set to false if using a third-party lightbox effect
if( true ){

    /* Set lightbox */
    define('LUXBOXROOT', LUXROOT.'/luxbox');
    
    /* Load luxbox CSS... */
    echo '<link rel="stylesheet" href="'.LUXROOT.'/luxbox/style/luxbox.css">';

};


/** Load CSS... **/

    /* CSS for galleries */
    echo '<link rel="stylesheet" href="'.LUXROOT.'/style/luxgallery.css">';

    /* Include normalize.css */
    echo '<link rel="stylesheet" href="'.LUXROOT.'/style/normalize.css">';





