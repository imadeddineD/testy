document.addEventListener("DOMContentLoaded", () => {
    const thumbnail = document.querySelector(".thumbnail");
    const items = document.querySelectorAll(".thumbnail .item");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const timelineItems = document.querySelectorAll(".timeline .timeline-item");
    const progressBar = document.querySelector(".progress-bar");
    let currentIndex = 0;

    function updateCarousel() {
        // Move the scroll position to the current item
        thumbnail.scrollTo({
            left: items[currentIndex].offsetLeft,
            behavior: "smooth"
        });

        // Update the active class on thumbnail items
        items.forEach(item => item.classList.remove("active"));
        items[currentIndex].classList.add("active");

        // Update the active class on the timeline items
        updateTimeline();

        // Change background and content based on the active thumbnail item
        const bg = items[currentIndex].getAttribute("data-bg");
        const title = items[currentIndex].getAttribute("data-title");
        changeBg(bg, title);

        // Update the progress bar
        const progressPercentage = ((currentIndex + 1) / items.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function updateTimeline() {
        timelineItems.forEach(item => item.classList.remove("active"));
        timelineItems[currentIndex].classList.add("active");
    }

    nextButton.addEventListener("click", () => {
        currentIndex += 1;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        updateCarousel();
    });

    updateCarousel();
});

function changeBg(bg, title) {
    const banner = document.querySelector('.banner');
    const contents = document.querySelectorAll('.content');

    banner.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(./image/${bg}) no-repeat center center`;
    banner.style.backgroundSize = `cover`;
    banner.style.backgroundPosition = `center`;

    contents.forEach(content => {
        content.classList.remove('active');
        if (content.classList.contains(title)) {
            content.classList.add('active');
        }
    });
}
