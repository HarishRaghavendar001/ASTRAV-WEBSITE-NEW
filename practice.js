
document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       1. TESTIMONIAL CAROUSEL
    ================================ */

    const myCarousel = document.querySelector("#testimonialCarousel");

    if (myCarousel) {
        new bootstrap.Carousel(myCarousel, {
            interval: 3500,
            wrap: true,
            pause: false
        });
    }


    /* ===============================
       2. NAVBAR AUTO CLOSE (MOBILE)
    ================================ */

    document.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            const navbarCollapse = document.querySelector(".navbar-collapse");

            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }

        });

    });


    /* ===============================
       3. SCROLL TO TOP BUTTON
    ================================ */

    const scrollBtn = document.querySelector(".scroll-top");

    window.addEventListener("scroll", function () {

        if (scrollBtn) {
            scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
        }

    });


    /* ===============================
       4. EXPERIENCE COUNTER
    ================================ */

    const counters = document.querySelectorAll(".counter");

    counters.forEach(function (counter) {

        counter.innerText = "0";

        const updateCounter = function () {

            const target = Number(counter.getAttribute("data-target"));
            const current = Number(counter.innerText);
            const increment = target / 200;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target + "+";
            }

        };

        updateCounter();

    });


    /* ===============================
       5. DATE RESTRICTIONS
       DATE OF BIRTH: TODAY OR PAST
       APPOINTMENT DATE: FUTURE ALLOWED
    ================================ */

    const birthDateInput = document.getElementById("birthDate");
    const preferredDateInput = document.getElementById("preferredDate");

    function setBirthDateLimit() {

        if (!birthDateInput) return;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        const todayDate = `${year}-${month}-${day}`;

        // Prevent selecting a future date of birth
        birthDateInput.max = todayDate;

        // Clear any previously selected future date
        if (birthDateInput.value > todayDate) {
            birthDateInput.value = "";
        }
    }

    setBirthDateLimit();

    // Recheck the selected date on mobile and desktop
    if (birthDateInput) {

        birthDateInput.addEventListener("change", function () {

            setBirthDateLimit();

            if (this.value > this.max) {
                this.value = "";
                alert("Date of Birth cannot be in the future.");
            }

            if (typeof checkFormValidity === "function") {
                checkFormValidity();
            }

        });

    }

    if (preferredDateInput) {

        // Allow future dates for appointment booking
        preferredDateInput.removeAttribute("max");

    }


    /* ===============================
       6. APPOINTMENT FORM TO WHATSAPP
    ================================ */

    const appointmentForm = document.getElementById("appointmentForm");

    if (appointmentForm) {

        // Enable Submit only when all mandatory fields are valid
        const submitButton = appointmentForm.querySelector(".appointment-submit");

        const requiredFields = appointmentForm.querySelectorAll(
            "input[required], select[required], textarea[required]"
        );

        function checkFormValidity() {

            if (submitButton) {
                submitButton.disabled = !appointmentForm.checkValidity();
            }

        }

        // Keep Submit disabled until mandatory fields are valid
        if (submitButton) {
            submitButton.disabled = true;
        }

        requiredFields.forEach(function (field) {

            field.addEventListener("input", checkFormValidity);
            field.addEventListener("change", checkFormValidity);

        });


        appointmentForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Recheck Date of Birth before submission
            setBirthDateLimit();

            if (birthDateInput && birthDateInput.value > birthDateInput.max) {
                alert("Date of Birth cannot be in the future. Please select today or an earlier date.");
                birthDateInput.value = "";
                checkFormValidity();
                return;
            }

            // Validate required form fields
            if (!appointmentForm.reportValidity()) {
                checkFormValidity();
                return;
            }

            // Astrologer's WhatsApp number
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
                document.getElementById("preferredDate").value || "Not specified";

            const message =
                document.getElementById("customerMessage").value.trim() || "None";


            // Prepare WhatsApp appointment message
            const whatsappMessage =
`Hi Astro Ravichandran,

I would like to book an astrology consultation. Please find my details below:

Name: ${name}
Mobile Number: ${phone}
Service: ${service}
Date of Birth: ${birthDate}
Time of Birth: ${birthTime}
Place of Birth: ${birthPlace}
Preferred Appointment Date: ${preferredDate}
Additional Questions: ${message}

Please share the appointment and payment details.

Thank you.`;


            // Prepare WhatsApp URL
            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


            // Open WhatsApp with appointment details
            window.open(whatsappURL, "_blank");


            // Close appointment form and show introduction again
            const intro = document.getElementById("homeIntro");
            const appointmentPopup = document.getElementById("appointmentPopup");

            if (appointmentPopup) {
                appointmentPopup.style.display = "none";
            }

            if (intro) {
                intro.style.display = "block";
            }


            // Reset form fields
            appointmentForm.reset();

            // Disable Submit again after resetting the form
            checkFormValidity();

        });

    }


    /* ===============================
       7. SERVICE CARD TAP SUPPORT
    ================================ */

    document.querySelectorAll(".service-box").forEach(function (card) {

        card.addEventListener("click", function () {

            if (window.matchMedia("(hover: none)").matches) {
                card.classList.toggle("is-flipped");
            }

        });

    });

});


/* ===============================
   8. APPOINTMENT FORM TOGGLE
================================ */

function toggleAppointment() {

    const intro = document.getElementById("homeIntro");
    const form = document.getElementById("appointmentPopup");

    if (!intro || !form) {
        return;
    }

    if (getComputedStyle(form).display === "none") {

        intro.style.display = "none";
        form.style.display = "block";

    } else {

        form.style.display = "none";
        intro.style.display = "block";

    }

}


/* ===============================
   9. VIDEO SLIDER
================================ */

let track = document.getElementById("videoTrack");
let scrollAmount = 0;

function moveSlide(direction) {

    if (track) {
        track.style.animation = "none";
        scrollAmount += direction * 370;
        track.style.transform = `translateX(-${scrollAmount}px)`;
    }

}
