var pageLink = window.location.href;
var pageTitle = String(document.title).replace(/\&/g, '%26');

function facebook_click() { window.open(`http://www.facebook.com/sharer.php?u=${pageLink}&quote=${pageTitle}`, 'sharer', 'toolbar=0,status=0,width=626,height=436'); return false; }

function twitter_click() { window.open(`https://twitter.com/intent/tweet?text=${pageTitle}&status=${pageLink}`, 'sharer', 'toolbar=0,status=0,width=626,height=436'); return false; }

function linkedin_click() { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageLink}`, 'sharer', 'toolbar=0,status=0,width=626,height=436'); return false; }
