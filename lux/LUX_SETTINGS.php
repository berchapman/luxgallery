<?php




/* Set folder(s) for gallery images */
/* LuxGallery will pull images for galleries from these folders */
define('LUXGALLERYFOLDER', 'images');



/* Set absolute path to lux */
/* Default to web root */
define('LUXROOT', '/lux');


/* Set loading animation for gallery thumbs */
define('LUXLOADING', 'loading.gif');



/* Set lightbox */
// Set the block following this value to false if not using luxbox
define('LIGHTBOXPATH', LUXROOT.'/luxbox/luxbox.js');


/* Use luxbox for the lightbox effect? */
// Set to false if using a third-party lightbox effect. By default the integrated luxbox will be used.
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
    /* Comment this out if normalize.css is already used in your website */
    echo '<link rel="stylesheet" href="'.LUXROOT.'/style/normalize.min.css">';





