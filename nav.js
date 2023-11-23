const clickableDivs = document.querySelectorAll('.projects-item');

// Add click event listeners to each div
clickableDivs.forEach(div => {
    div.addEventListener('click', function () {
        // Get the data-link attribute to determine the target page
        const targetPage = div.getAttribute('data-link');
        if (targetPage) {
            // Redirect to the target page
            window.location.href = targetPage;
        }
    });
});