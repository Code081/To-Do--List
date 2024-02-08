document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

// Select the dark mode switch
const darkSwitch = document.getElementById('darkSwitch');

// Add an event listener to the dark mode switch
darkSwitch.addEventListener('change', function() {
    // Toggle the 'dark' class on the body element
    document.body.classList.toggle('dark', this.checked);
});

