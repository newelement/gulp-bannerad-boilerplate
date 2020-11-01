let $banner, 
timer = 7500, // Adjust as needed
loopCount = 1, // Adjust as needed
intervalCount = 0, // Don't alter
loopInterval = setInterval(animateLoop, (timer-100) ); // Don't alter

function animateLoop(){

if( loopCount === intervalCount ){
	clearInterval(loopInterval);
}

$banner.classList.remove('animate');
setTimeout(function(){
	$banner.classList.add('animate');
}, 100);

intervalCount++;
}

document.addEventListener("DOMContentLoaded", function(){
$banner = document.getElementById('banner-ad');
animateLoop();
});