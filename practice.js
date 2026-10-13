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



/* 5. APPOINTMENT FORM TOGGLE */

function toggleAppointment() {

    const intro = document.getElementById("homeIntro");
    const form = document.getElementById("appointmentPopup");

    if (!intro || !form) return;

    if (getComputedStyle(form).display === "none") {
        intro.style.display = "none";
        form.style.display = "block";
    } else {
        form.style.display = "none";
        intro.style.display = "block";
    }
}


/* ===============================
   5A. APPOINTMENT FORM TO WHATSAPP
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const appointmentForm = document.getElementById("appointmentForm");

    if (!appointmentForm) return;

    appointmentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Validate required form fields
        if (!appointmentForm.reportValidity()) {
            return;
        }

        // Astrologer's WhatsApp number (India country code + number)
        const whatsappNumber = "919715189647";

        // Get customer details
        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const service = document.getElementById("appointmentService").value;
        const birthDate = document.getElementById("birthDate").value;
        const birthHour = document.getElementById("birthHour").value;
        const birthMinute = document.getElementById("birthMinute").value;
        const birthPeriod = document.getElementById("birthPeriod").value;
        const birthTime = `${birthHour}:${birthMinute} ${birthPeriod}`;

        const birthPlace = document.getElementById("birthPlace").value.trim();

        const preferredDate =
            document.getElementById("preferredDate").value || "Not specified / குறிப்பிடவில்லை";

        const message =
            document.getElementById("customerMessage").value.trim() ||
            "None / இல்லை";

        // Prepare bilingual WhatsApp message
        const whatsappMessage =
`வணக்கம் 

Appointment Request 

Name : ${name}
Mobile Number : ${phone}
Service : ${service}
Date of Birth : ${birthDate}
Time of Birth : ${birthTime}
Place of Birth : ${birthPlace}
Preferred Appointment Date : ${preferredDate}
Additional Questions : ${message}

Please share the appointment and payment details.

நன்றி `;

        // Open WhatsApp with the details prefilled
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");

    });

});

/* 5B. SERVICE CARD TAP SUPPORT */

document.querySelectorAll(".service-box").forEach(function(card) {

    card.addEventListener("click", function() {

        // Toggle the card when tapped on a touch device
        if (window.matchMedia("(hover: none)").matches) {
            card.classList.toggle("is-flipped");
        }

    });

});



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