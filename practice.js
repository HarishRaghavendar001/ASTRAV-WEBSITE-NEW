document.addEventListener("DOMContentLoaded", function(){

/* ===============================
   1. TESTIMONIAL CAROUSEL
================================ */

let myCarousel = document.querySelector('#testimonialCarousel');

if(myCarousel){
new bootstrap.Carousel(myCarousel,{
interval:3500,
wrap:true,
pause:false
});
}


/* ===============================
   2. NAVBAR AUTO CLOSE (MOBILE)
================================ */

document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link){

link.addEventListener('click', function(){

let navbarCollapse = document.querySelector('.navbar-collapse');

if(navbarCollapse){
let bsCollapse = new bootstrap.Collapse(navbarCollapse,{toggle:false});
bsCollapse.hide();
}

});

});


/* ===============================
   3. SCROLL TO TOP BUTTON
================================ */

let scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", function(){

if(scrollBtn){
if(window.scrollY > 300){
scrollBtn.style.display = "flex";
}else{
scrollBtn.style.display = "none";
}
}

});


/* ===============================
   4. EXPERIENCE COUNTER
================================ */

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

counter.innerText='0';

const updateCounter = () =>{

const target = +counter.getAttribute('data-target');
const c = +counter.innerText;
const inc = target / 200;

if(c < target){
counter.innerText = Math.ceil(c + inc);
setTimeout(updateCounter,10);
}
else{
counter.innerText = target + "+";
}

}

updateCounter();

});

});


/* ===============================
   5. APPOINTMENT POPUP
================================ */

function toggleAppointment(){

let popup = document.getElementById("appointmentPopup");

if(popup.style.display === "block"){
popup.style.display = "none";
}else{
popup.style.display = "block";
}

}


/* ===============================
   6. VIDEO SLIDER
================================ */

let track = document.getElementById("videoTrack");

let scrollAmount = 0;

function moveSlide(direction){

if(track){
track.style.animation = "none";
scrollAmount += direction * 370;
track.style.transform = `translateX(-${scrollAmount}px)`;
}

}