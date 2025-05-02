// Variables for automatic rotation
let autoRotationIntervals = {};
const AUTO_ROTATION_DELAY = 5000; // 5 seconds between changes

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Before/After Sliders
    initializeComparisonSliders();

    // Initialize Zone Navigation
    initializeZoneNavigation();

    // Initialize Gallery Navigation
    initializeGalleryNavigation();

    // Initialize Image Pair Navigation
    initializePairNavigation();

    // Initialize Lightbox
    initializeLightbox();

    // Initialize Global Galleries
    initializeGlobalGalleries();

    // Initial Zone Images
    initializeZoneImages();

    // Initialize pair counters
    initializePairCounters();

    // Initialize Filter Tabs
    initializeFilterTabs();

    // Initialize scroll to top button
    initializeScrollToTopButton();

    // Make thumbnails touch-friendly
    initializeTouchFriendlyThumbnails();

    // Start automatic rotation for all zones
    initializeAutoRotation();
});

// Initialize scroll to top button
function initializeScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (!scrollToTopBtn) return;

    // Show button when user scrolls down 300px
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Function to make thumbnails more touch-friendly
function initializeTouchFriendlyThumbnails() {
    // Improve thumbnail containers scrolling on mobile
    const thumbnailContainers = document.querySelectorAll('.thumbnail-container');

    thumbnailContainers.forEach(container => {
        // Add momentum scrolling for iOS
        container.style.webkitOverflowScrolling = 'touch';

        // Make the right arrow button functional
        const rightArrow = container.parentElement.querySelector('.fa-chevron-right');
        if (rightArrow) {
            rightArrow.addEventListener('click', function () {
                container.scrollBy({
                    left: 200,
                    behavior: 'smooth'
                });
            });
        }
    });

    // Improve filter tabs scrolling on mobile
    const filterContainers = document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('touchstart', function () {
            this.classList.add('active-touch');
        });

        tab.addEventListener('touchend', function () {
            this.classList.remove('active-touch');
        });
    });
}

// Function to initialize the filter tabs functionality
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            const section = this.getAttribute('data-section');

            // Update active state on tabs
            const sectionTabs = document.querySelectorAll(`.filter-tab[data-section="${section}"]`);
            sectionTabs.forEach(tab => {
                tab.classList.remove('active', 'bg-blue-100', 'text-blue-800');
                tab.classList.add('bg-gray-100', 'text-gray-800');
            });

            this.classList.add('active', 'bg-blue-100', 'text-blue-800');
            this.classList.remove('bg-gray-100', 'text-gray-800');

            // Filter images based on category
            filterGalleryImages(category, section);
        });
    });
}

// Function to filter gallery images based on category
function filterGalleryImages(category, section) {
    const gridId = `grid-todas-${section}`;
    const grid = document.getElementById(gridId);

    if (!grid) return;

    // Clear the grid
    grid.innerHTML = '';

    if (category === 'todas') {
        // Show all images for this section
        populateGlobalGalleries();
    } else {
        // Get only images from the selected category
        const images = [];

        // Get images for the selected category from zoneImagesData
        if (zoneImagesData[category]) {
            const zoneImages = section === 'antes' ?
                zoneImagesData[category].before :
                zoneImagesData[category].after;

            if (zoneImages) {
                zoneImages.forEach(img => {
                    images.push({
                        file: img.file,
                        title: img.title,
                        zone: category
                    });
                });
            }
        }

        // Display filtered count in the UI
        const activeTab = document.querySelector(`.filter-tab[data-category="${category}"][data-section="${section}"].active`);
        if (activeTab) {
            // Update count if needed
            const countText = images.length > 0 ? `(${images.length})` : '(0)';
            if (!activeTab.textContent.includes(countText)) {
                activeTab.textContent = `${category === 'todas' ? 'Todas' : capitalizeFirstLetter(category)} ${countText}`;
            }
        }

        // Populate the grid with filtered images
        populateGalleryGrid(gridId, images);
    }
}

// Function to start automatic rotation
function initializeAutoRotation() {
    Object.keys(zoneImagesData).forEach((zone) => {
        startAutoRotation(zone);
    });
}

// Function to start automatic rotation for a specific zone
function startAutoRotation(zone) {
    // Clear any existing interval for this zone
    if (autoRotationIntervals[zone]) {
        clearInterval(autoRotationIntervals[zone]);
    }

    const zoneData = zoneImagesData[zone];
    if (!zoneData || !zoneData.pairs || zoneData.pairs.length <= 1) return;

    autoRotationIntervals[zone] = setInterval(() => {
        // Only rotate if this is the currently visible content
        const zoneContent = document.getElementById(zone);
        if (zoneContent && !zoneContent.classList.contains("hidden")) {
            navigateComparisonPairs(zone, "next", false);
        }
    }, AUTO_ROTATION_DELAY);
}

// Function to stop automatic rotation
function stopAutoRotation(zone) {
    if (autoRotationIntervals[zone]) {
        clearInterval(autoRotationIntervals[zone]);
        delete autoRotationIntervals[zone];
    }
}

// Navigate comparison pairs and restart timer
function navigateComparisonPairs(zone, direction, isUserInitiated = false) {
    const zoneContent = document.getElementById(zone);
    if (!zoneContent) return;

    const zoneData = zoneImagesData[zone];
    if (!zoneData || !zoneData.pairs || zoneData.pairs.length <= 1) return;

    const activePair = zoneContent.querySelector(".pair-thumbnail.active");
    if (!activePair) return;

    const currentPairId = activePair.getAttribute("data-pair");
    const currentIndex = zoneData.pairs.findIndex((p) => p.id === currentPairId);

    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev") {
        newIndex =
            (currentIndex - 1 + zoneData.pairs.length) % zoneData.pairs.length;
    } else {
        newIndex = (currentIndex + 1) % zoneData.pairs.length;
    }

    const newPair = zoneData.pairs[newIndex];
    const newPairThumbnail = zoneContent.querySelector(
        `.pair-thumbnail[data-pair="${newPair.id}"]`
    );

    if (newPairThumbnail) {
        // Update active thumbnail
        zoneContent
            .querySelectorAll(".pair-thumbnail")
            .forEach((btn) => btn.classList.remove("active"));
        newPairThumbnail.classList.add("active");

        // Add clear visual transition effect
        const container = zoneContent.querySelector(".comparison-container");
        if (container) {
            container.style.transition = "opacity 0.2s ease";
            container.style.opacity = "0.7";

            // Only scroll into view if this was user initiated (not auto-rotation)
            if (isUserInitiated && newPairThumbnail.scrollIntoView) {
                newPairThumbnail.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                });
            }

            setTimeout(() => {
                // Load the new pair of images
                loadComparisonImages(zone, newPair.before, newPair.after);

                // Restore opacity
                setTimeout(() => {
                    container.style.opacity = "1";
                }, 50);

                // Update pair counter
                updatePairCounter(zone, newIndex, zoneData.pairs.length);
            }, 100);
        } else {
            // Fallback if container not found
            loadComparisonImages(zone, newPair.before, newPair.after);
            updatePairCounter(zone, newIndex, zoneData.pairs.length);
        }

        // Restart automatic rotation timer
        if (autoRotationIntervals[zone]) {
            stopAutoRotation(zone);
            startAutoRotation(zone);
        }
    }
}

// Initialize zone navigation
function initializeZoneNavigation() {
    const zoneButtons = document.querySelectorAll(".zone-thumbnail");
    const zoneContents = document.querySelectorAll(".zone-content");

    zoneButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const zone = this.getAttribute("data-zone");

            // Update active button
            zoneButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            // Show corresponding content
            zoneContents.forEach((content) => {
                const contentZone = content.id;
                if (contentZone === zone) {
                    content.classList.remove("hidden");
                    // Start rotation for this zone
                    startAutoRotation(contentZone);

                    // Scroll to top of content on mobile
                    if (window.innerWidth < 768) {
                        setTimeout(() => {
                            content.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 100);
                    }
                } else {
                    content.classList.add("hidden");
                    // Stop rotation for hidden zones
                    stopAutoRotation(contentZone);
                }
            });
        });
    });
}

// Initialize pair navigation with pause during interaction
function initializePairNavigation() {
    document.addEventListener("click", function (e) {
        if (e.target.closest(".pair-thumbnail")) {
            const pairButton = e.target.closest(".pair-thumbnail");
            const zone = pairButton.closest(".zone-content").id;
            const pairId = pairButton.getAttribute("data-pair");

            // Temporarily pause automatic rotation
            stopAutoRotation(zone);

            // Update active button
            const pairButtons = pairButton
                .closest(".thumbnail-container")
                .querySelectorAll(".pair-thumbnail");
            pairButtons.forEach((btn) => btn.classList.remove("active"));
            pairButton.classList.add("active");

            // Load the appropriate images
            const zoneData = zoneImagesData[zone];
            if (zoneData) {
                const pair = zoneData.pairs.find((p) => p.id === pairId);
                if (pair) {
                    loadComparisonImages(zone, pair.before, pair.after);

                    // Update counter
                    const pairIndex = zoneData.pairs.findIndex((p) => p.id === pairId);
                    if (pairIndex !== -1) {
                        updatePairCounter(zone, pairIndex, zoneData.pairs.length);
                    }
                }
            }

            // Restart rotation after a delay
            setTimeout(() => {
                startAutoRotation(zone);
            }, AUTO_ROTATION_DELAY * 2);
        }

        // If user clicked on arrow buttons in the slider
        if (e.target.closest(".comparison-slider-arrows i")) {
            const arrow = e.target.closest(".comparison-slider-arrows i");
            const container = arrow.closest(".comparison-container");
            if (container) {
                const zone = container.closest(".zone-content").id;
                const direction = arrow.classList.contains("fa-chevron-left") ? "prev" : "next";
                navigateComparisonPairs(zone, direction, true);
            }
        }
    });
}

// Initialize comparison sliders with pause during interaction
function initializeComparisonSliders() {
    const sliders = document.querySelectorAll(".comparison-slider");

    sliders.forEach((slider) => {
        const container = slider.closest(".comparison-container");
        const zone = container.closest(".zone-content").id;
        const beforeImageClip = container.querySelector(".before-image-clip");

        // Initial position
        let sliderPosition = 50;
        beforeImageClip.style.width = sliderPosition + "%";
        slider.style.left = sliderPosition + "%";

        // Mouse drag functionality
        let isDragging = false;

        slider.addEventListener("mousedown", function (e) {
            isDragging = true;
            e.preventDefault();

            // Pause rotation during interaction
            stopAutoRotation(zone);
        });

        document.addEventListener("mouseup", function () {
            if (isDragging) {
                isDragging = false;

                // Restart rotation after releasing
                setTimeout(() => {
                    startAutoRotation(zone);
                }, AUTO_ROTATION_DELAY);
            }
        });

        document.addEventListener("mousemove", function (e) {
            if (isDragging) {
                const containerRect = container.getBoundingClientRect();
                let newPosition =
                    ((e.clientX - containerRect.left) / containerRect.width) * 100;

                // Limit position between 5% and 95%
                newPosition = Math.max(5, Math.min(95, newPosition));

                sliderPosition = newPosition;
                beforeImageClip.style.width = sliderPosition + "%";
                slider.style.left = sliderPosition + "%";
            }
        });

        // Touch events for mobile
        slider.addEventListener("touchstart", function (e) {
            isDragging = true;

            // Pause rotation during touch interaction
            stopAutoRotation(zone);

            // Prevent page scrolling when interacting with slider
            e.preventDefault();
        });

        document.addEventListener("touchend", function () {
            if (isDragging) {
                isDragging = false;

                // Restart rotation after releasing
                setTimeout(() => {
                    startAutoRotation(zone);
                }, AUTO_ROTATION_DELAY);
            }
        });

        document.addEventListener("touchmove", function (e) {
            if (isDragging) {
                const containerRect = container.getBoundingClientRect();
                const touch = e.touches[0];
                let newPosition =
                    ((touch.clientX - containerRect.left) / containerRect.width) * 100;

                newPosition = Math.max(5, Math.min(95, newPosition));

                sliderPosition = newPosition;
                beforeImageClip.style.width = sliderPosition + "%";
                slider.style.left = sliderPosition + "%";

                // Prevent page scrolling when dragging
                e.preventDefault();
            }
        });

        // Add zoom hint to comparison container
        const zoomHint = document.createElement("div");
        zoomHint.className = "zoom-hint";
        zoomHint.innerHTML = '<i class="fas fa-search-plus"></i>';
        container.appendChild(zoomHint);

        // Make comparison containers clickable to open lightbox
        container.addEventListener("click", function () {
            const zone = this.closest(".zone-content").id;
            const zoneData = zoneImagesData[zone];

            if (!zoneData) return;

            const activePair = this.closest(".zone-content").querySelector(
                ".pair-thumbnail.active"
            );
            const pairId = activePair ? activePair.getAttribute("data-pair") : "1";

            // Find the matching pair
            const pair = zoneData.pairs.find((p) => p.id === pairId);
            if (!pair) return;

            // Pause rotation while lightbox is open
            stopAutoRotation(zone);

            // Create gallery with before/after images
            const gallery = [
                {
                    src: `imagenes/${zone}/${pair.before}`,
                    caption: `ANTES - ${pair.title}`,
                },
                {
                    src: `imagenes/${zone}/${pair.after}`,
                    caption: `DESPUÉS - ${pair.title}`,
                },
            ];

            // Open lightbox with the first image
            openLightbox(gallery[0].src, gallery[0].caption, gallery, 0);
        });

        // Add navigation arrows for comparison pairs
        const arrowLeft = container.querySelector(
            ".comparison-slider-arrows .fa-chevron-left"
        );
        const arrowRight = container.querySelector(
            ".comparison-slider-arrows .fa-chevron-right"
        );

        if (arrowLeft && arrowRight) {
            const zone = container.closest(".zone-content").id;

            // Navigate to previous pair
            arrowLeft.addEventListener("click", function (e) {
                e.stopPropagation(); // Prevent lightbox from opening
                navigateComparisonPairs(zone, "prev", true);
            });

            // Navigate to next pair
            arrowRight.addEventListener("click", function (e) {
                e.stopPropagation(); // Prevent lightbox from opening
                navigateComparisonPairs(zone, "next", true);
            });
        }
    });
}

// Initialize lightbox with rotation restart on close
function initializeLightbox() {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxCaption = document.getElementById("lightbox-caption");

    // Variable to store the active zone before opening lightbox
    let activeZoneBeforeLightbox = null;

    // Variables for touch navigation
    let touchStartX = 0;
    let touchEndX = 0;

    // Add loading state for images
    let isImageLoading = false;

    // Close lightbox
    lightboxClose.addEventListener("click", function () {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";

        // Restart rotation for the active zone when closing lightbox
        if (activeZoneBeforeLightbox) {
            setTimeout(() => {
                startAutoRotation(activeZoneBeforeLightbox);
            }, 500);
        }
    });

    // Click outside to close
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.classList.remove("open");
            document.body.style.overflow = "";

            // Restart rotation for the active zone
            if (activeZoneBeforeLightbox) {
                setTimeout(() => {
                    startAutoRotation(activeZoneBeforeLightbox);
                }, 500);
            }
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("open")) return;

        if (e.key === "Escape") {
            lightbox.classList.remove("open");
            document.body.style.overflow = "";

            // Restart rotation for the active zone
            if (activeZoneBeforeLightbox) {
                setTimeout(() => {
                    startAutoRotation(activeZoneBeforeLightbox);
                }, 500);
            }
        } else if (e.key === "ArrowLeft") {
            navigateLightbox("prev");
        } else if (e.key === "ArrowRight") {
            navigateLightbox("next");
        }
    });

    // Navigate to previous/next image
    lightboxPrev.addEventListener("click", function () {
        navigateLightbox("prev");
    });

    lightboxNext.addEventListener("click", function () {
        navigateLightbox("next");
    });

    // Touch events for mobile swipe
    lightboxImage.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightboxImage.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        // If swipe is long enough, navigate accordingly
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left (next)
            navigateLightbox("next");
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right (prev)
            navigateLightbox("prev");
        }
    }

    function navigateLightbox(direction) {
        if (!window.currentGallery || window.currentGallery.length <= 1 || isImageLoading) return;

        isImageLoading = true;

        // Add loading class to the image
        lightboxImage.classList.add('loading');

        let newIndex;
        if (direction === "prev") {
            newIndex =
                (window.currentIndex - 1 + window.currentGallery.length) %
                window.currentGallery.length;
        } else {
            newIndex =
                (window.currentIndex + 1) % window.currentGallery.length;
        }

        window.currentIndex = newIndex;
        const item = window.currentGallery[window.currentIndex];

        // Preload the image to ensure smooth transitions
        const preloadImg = new Image();
        preloadImg.onload = function () {
            lightboxImage.src = item.src;
            lightboxCaption.textContent = item.caption || "";

            // Remove loading state after a short delay
            setTimeout(() => {
                lightboxImage.classList.remove('loading');
                isImageLoading = false;
            }, 200);
        };

        preloadImg.onerror = function () {
            // If image fails to load, still update src and remove loading state
            lightboxImage.src = item.src;
            lightboxCaption.textContent = item.caption || "";
            lightboxImage.classList.remove('loading');
            isImageLoading = false;
        };

        preloadImg.src = item.src;
    }

    // Make window.openLightbox available for other functions
    window.openLightbox = function (src, caption, gallery, index) {
        // Reset loading state
        isImageLoading = false;
        lightboxImage.classList.remove('loading');

        lightboxImage.src = src;
        lightboxCaption.textContent = caption || "";
        window.currentGallery = gallery || [{ src, caption }];
        window.currentIndex = index || 0;

        // Save the active zone before opening lightbox
        const activeZone = document.querySelector(".zone-content:not(.hidden)");
        if (activeZone) {
            activeZoneBeforeLightbox = activeZone.id;
        }

        // Show/hide navigation buttons based on gallery length
        if (window.currentGallery.length <= 1) {
            lightboxPrev.style.display = "none";
            lightboxNext.style.display = "none";
        } else {
            lightboxPrev.style.display = "flex";
            lightboxNext.style.display = "flex";
        }

        lightbox.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
    };
}

// Add or update the pair counter
function updatePairCounter(zone, currentIndex, totalPairs) {
    const container = document.querySelector(`#${zone} .comparison-container`);
    if (!container) return;

    let counter = container.querySelector(".pair-counter");

    if (!counter) {
        counter = document.createElement("div");
        counter.className = "pair-counter";
        container.appendChild(counter);
    }

    counter.textContent = `${currentIndex + 1} / ${totalPairs}`;
}

// Initialize pair counters
function initializePairCounters() {
    Object.keys(zoneImagesData).forEach((zone) => {
        const zoneData = zoneImagesData[zone];
        if (zoneData && zoneData.pairs && zoneData.pairs.length > 0) {
            // Make sure pair counters are visible for all sections, even those with a single pair
            updatePairCounter(zone, 0, zoneData.pairs.length);

            // Make sure the arrows are visible/hidden appropriately
            const container = document.querySelector(`#${zone} .comparison-container`);
            if (container) {
                const arrowLeft = container.querySelector(
                    ".comparison-slider-arrows .fa-chevron-left"
                );
                const arrowRight = container.querySelector(
                    ".comparison-slider-arrows .fa-chevron-right"
                );

                if (arrowLeft && arrowRight) {
                    // Always show arrows since now all sections have multiple pairs
                    arrowLeft.style.visibility = "visible";
                    arrowRight.style.visibility = "visible";
                    arrowLeft.style.opacity = "1";
                    arrowRight.style.opacity = "1";

                    // Ensure click events work correctly
                    if (!arrowLeft.hasAttribute("data-initialized")) {
                        arrowLeft.setAttribute("data-initialized", "true");
                        arrowLeft.addEventListener("click", function (e) {
                            e.stopPropagation();
                            navigateComparisonPairs(zone, "prev", true);
                        });

                        arrowRight.addEventListener("click", function (e) {
                            e.stopPropagation();
                            navigateComparisonPairs(zone, "next", true);
                        });
                    }
                }
            }
        }
    });
}

// Gallery navigation
function initializeGalleryNavigation() {
    const galleryNavButtons = document.querySelectorAll(".gallery-nav-button");

    galleryNavButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const view = this.getAttribute("data-view");
            const zone = this.closest(".zone-content").id;

            // Update active button
            const zoneButtons = this.closest(".zone-content").querySelectorAll(
                ".gallery-nav-button"
            );
            zoneButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            // Show/hide appropriate elements
            const comparisonContainer = document.querySelector(
                `#${zone} .comparison-container`
            );
            const thumbnailSection = document
                .querySelector(`#${zone} .thumbnail-container`)
                .closest("div");
            const beforeGallery = document.getElementById(`${zone}-before-gallery`);
            const afterGallery = document.getElementById(`${zone}-after-gallery`);

            if (view === "comparison") {
                comparisonContainer.classList.remove("hidden");
                thumbnailSection.classList.remove("hidden");
                beforeGallery.classList.add("hidden");
                afterGallery.classList.add("hidden");
            } else if (view === "before") {
                comparisonContainer.classList.add("hidden");
                thumbnailSection.classList.add("hidden");
                beforeGallery.classList.remove("hidden");
                afterGallery.classList.add("hidden");
            } else if (view === "after") {
                comparisonContainer.classList.add("hidden");
                thumbnailSection.classList.add("hidden");
                beforeGallery.classList.add("hidden");
                afterGallery.classList.remove("hidden");
            }
        });
    });
}

// Global galleries initialization
function initializeGlobalGalleries() {
    const enlaceTodasAntes = document.getElementById("enlace-todas-antes");
    const enlaceTodasDespues = document.getElementById("enlace-todas-despues");
    const seccionTodasAntes = document.getElementById("todas-imagenes-antes");
    const seccionTodasDespues = document.getElementById("todas-imagenes-despues");
    const cerrarTodasAntesFlotante = document.getElementById(
        "cerrar-todas-antes-flotante"
    );
    const cerrarTodasDespuesFlotante = document.getElementById(
        "cerrar-todas-despues-flotante"
    );
    const mainContent = document.querySelector("main");
    const footer = document.querySelector("footer");

    // Events to show all images
    enlaceTodasAntes.addEventListener("click", function (e) {
        e.preventDefault();
        mainContent.classList.add("hidden");
        footer.classList.add("hidden");
        seccionTodasDespues.classList.add("hidden");
        seccionTodasAntes.classList.remove("hidden");
        window.scrollTo(0, 0);
    });

    enlaceTodasDespues.addEventListener("click", function (e) {
        e.preventDefault();
        mainContent.classList.add("hidden");
        footer.classList.add("hidden");
        seccionTodasAntes.classList.add("hidden");
        seccionTodasDespues.classList.remove("hidden");
        window.scrollTo(0, 0);
    });

    // Floating buttons to close galleries
    cerrarTodasAntesFlotante.addEventListener("click", function () {
        seccionTodasAntes.classList.add("hidden");
        mainContent.classList.remove("hidden");
        footer.classList.remove("hidden");
    });

    cerrarTodasDespuesFlotante.addEventListener("click", function () {
        seccionTodasDespues.classList.add("hidden");
        mainContent.classList.remove("hidden");
        footer.classList.remove("hidden");
    });

    // Populate global galleries
    populateGlobalGalleries();
}

// Populate all images galleries
function populateGlobalGalleries() {
    // All images for "Antes" gallery
    const antesImages = [];

    // All images for "Después" gallery
    const despuesImages = [];

    // Collect all images from all zones
    Object.keys(zoneImagesData).forEach(zone => {
        // Add "Antes" images
        if (zoneImagesData[zone].before) {
            zoneImagesData[zone].before.forEach(img => {
                antesImages.push({
                    file: img.file,
                    title: img.title,
                    zone: zone
                });
            });
        }

        // Add "Después" images
        if (zoneImagesData[zone].after) {
            zoneImagesData[zone].after.forEach(img => {
                despuesImages.push({
                    file: img.file,
                    title: img.title,
                    zone: zone
                });
            });
        }
    });

    // Populate the grids
    populateGalleryGrid('grid-todas-antes', antesImages);
    populateGalleryGrid('grid-todas-despues', despuesImages);
}

// Populate gallery grid
function populateGalleryGrid(gridId, images) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    // Clear existing content
    grid.innerHTML = '';

    // If no images, display a message
    if (!images || images.length === 0) {
        const noImages = document.createElement('div');
        noImages.className = 'col-span-full text-center py-8 text-gray-500';
        noImages.innerHTML = 'No hay imágenes disponibles para esta categoría.';
        grid.appendChild(noImages);
        return;
    }

    // Create gallery items array for lightbox navigation
    const galleryItems = images.map((image) => ({
        src: `imagenes/${image.zone}/${image.file}`,
        caption: `${image.title} - ${capitalizeFirstLetter(image.zone)}`
    }));

    // Create gallery items
    images.forEach((image, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105';
        itemDiv.setAttribute('data-zone', image.zone || '');
        itemDiv.style.height = window.innerWidth < 576 ? '200px' : '240px';

        // Set background image
        const imgPath = `imagenes/${image.zone}/${image.file}`;
        itemDiv.style.backgroundImage = `url('${imgPath}')`;
        itemDiv.style.backgroundSize = 'cover';
        itemDiv.style.backgroundPosition = 'center';

        // Add caption
        const caption = document.createElement('div');
        caption.className = 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-3 text-sm';
        caption.innerHTML = `<div class="font-medium">${image.title}</div><div class="text-xs text-gray-300 mt-1">${capitalizeFirstLetter(image.zone)}</div>`;
        itemDiv.appendChild(caption);

        // Add zoom hint
        const zoomHint = document.createElement('div');
        zoomHint.className = 'absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100';
        zoomHint.innerHTML = '<i class="fas fa-search-plus"></i>';
        itemDiv.appendChild(zoomHint);

        // Add click event to open in lightbox WITH proper gallery navigation
        itemDiv.addEventListener('click', function () {
            // Use the openLightbox function with the entire gallery
            openLightbox(imgPath, `${image.title} - ${capitalizeFirstLetter(image.zone)}`, galleryItems, index);
        });

        grid.appendChild(itemDiv);
    });
}

// Initialize zone images
function initializeZoneImages() {
    Object.keys(zoneImagesData).forEach((zone) => {
        if (document.getElementById(zone)) {
            const zoneData = zoneImagesData[zone];

            // Load the first pair of images
            if (zoneData.pairs && zoneData.pairs.length > 0) {
                const firstPair = zoneData.pairs[0];
                loadComparisonImages(zone, firstPair.before, firstPair.after);
            }

            // Setup pair thumbnails
            if (zoneData.pairs) {
                setupComparisonPairs(zone, zoneData.pairs);
            }

            // Populate before/after galleries
            if (zoneData.before) {
                populateGallery(`${zone}-before-gallery`, zone, zoneData.before);
            }

            if (zoneData.after) {
                populateGallery(`${zone}-after-gallery`, zone, zoneData.after);
            }

            // Set zone thumbnail
            if (zoneData.after && zoneData.after.length > 0) {
                const zoneButton = document.querySelector(
                    `.zone-thumbnail[data-zone="${zone}"]`
                );
                if (zoneButton) {
                    const zoneThumbnailImg = new Image();
                    zoneThumbnailImg.onload = function () {
                        zoneButton.style.backgroundImage = `url('imagenes/${zone}/${zoneData.after[0].file}')`;
                        zoneButton.style.backgroundSize = "cover";
                    };

                    zoneThumbnailImg.onerror = function () {
                        console.error(
                            `Failed to load zone thumbnail: imagenes/${zone}/${zoneData.after[0].file}`
                        );
                        // Leave default styling
                    };

                    zoneThumbnailImg.src = `imagenes/${zone}/${zoneData.after[0].file}`;
                }
            }
        }
    });
}

// Setup comparison pairs thumbnails
function setupComparisonPairs(zone, pairs) {
    const container = document.querySelector(`#${zone} .thumbnail-container`);
    if (!container) return;

    container.innerHTML = "";

    pairs.forEach((pair) => {
        const thumbnail = document.createElement("div");
        thumbnail.className = "pair-thumbnail";
        thumbnail.setAttribute("data-pair", pair.id);
        if (pair.id === "1") thumbnail.classList.add("active");

        const title = document.createElement("div");
        title.className = "zone-title text-xs";
        title.textContent = pair.title;

        thumbnail.appendChild(title);
        container.appendChild(thumbnail);

        // Set background image with error handling
        const thumbImg = new Image();
        thumbImg.onload = function () {
            thumbnail.style.backgroundImage = `url('imagenes/${zone}/${pair.after}')`;
            thumbnail.style.backgroundSize = "cover";
        };

        thumbImg.onerror = function () {
            console.error(
                `Failed to load thumbnail image: imagenes/${zone}/${pair.after}`
            );
            // Use a placeholder color instead
            thumbnail.style.backgroundColor = "#e2e8f0";
            thumbnail.style.backgroundImage = "none";
        };

        thumbImg.src = `imagenes/${zone}/${pair.after}`;
    });
}

// Populate gallery
function populateGallery(galleryId, zone, images) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    gallery.innerHTML = "";

    const galleryItems = images.map((img) => ({
        src: `imagenes/${zone}/${img.file}`,
        caption: img.title,
    }));

    images.forEach((img, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.style.backgroundImage = `url('imagenes/${zone}/${img.file}')`;

        const label = document.createElement("div");
        label.className = "gallery-item-label";
        label.textContent = img.title;

        item.appendChild(label);
        gallery.appendChild(item);

        // Add click event to open lightbox
        item.addEventListener("click", function () {
            openLightbox(
                `imagenes/${zone}/${img.file}`,
                img.title,
                galleryItems,
                index
            );
        });
    });
}

// Load comparison images
function loadComparisonImages(zone, beforeFileName, afterFileName) {
    const zoneContent = document.getElementById(zone);
    if (!zoneContent) return;

    const beforeImage = zoneContent.querySelector(".before-image");
    const afterImage = zoneContent.querySelector(".after-image");

    if (beforeImage && afterImage) {
        // Set default text in case images fail to load
        beforeImage.textContent = "";
        afterImage.textContent = "";

        // Create image objects to verify loading
        const beforeImg = new Image();
        const afterImg = new Image();

        beforeImg.onload = function () {
            beforeImage.style.backgroundImage = `url('imagenes/${zone}/${beforeFileName}')`;
            beforeImage.textContent = ""; // Clear text when image loads
        };

        beforeImg.onerror = function () {
            console.error(
                `Failed to load before image: imagenes/${zone}/${beforeFileName}`
            );
            beforeImage.textContent = "Imagen ANTES de la remodelación";
            beforeImage.style.backgroundImage = "none";
        };

        afterImg.onload = function () {
            afterImage.style.backgroundImage = `url('imagenes/${zone}/${afterFileName}')`;
            afterImage.textContent = ""; // Clear text when image loads
        };

        afterImg.onerror = function () {
            console.error(
                `Failed to load after image: imagenes/${zone}/${afterFileName}`
            );
            afterImage.textContent = "Imagen DESPUÉS de la remodelación";
            afterImage.style.backgroundImage = "none";
        };

        // Start loading the images
        beforeImg.src = `imagenes/${zone}/${beforeFileName}`;
        afterImg.src = `imagenes/${zone}/${afterFileName}`;
    }
}

// Helper: Capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 