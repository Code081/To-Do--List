const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const backgroundOptions = document.querySelectorAll('.background-option');
const body = document.body;

document.getElementById('darkSwitch').addEventListener('change', function() {
    document.body.classList.toggle('dark', this.checked);
});

openModalButton.addEventListener('click', function() {
    modal.style.display = 'block';
    setTimeout(function() {
        modal.style.opacity = '1';
    }, 50);
});

closeModalButton.addEventListener('click', function() {
    modal.style.opacity = '0';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500);
});

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.opacity = '0';
        setTimeout(function() {
            modal.style.display = 'none';
        }, 500);
    }
});


backgroundOptions.forEach(function(option) {
    const type = option.dataset.type;
    const value = option.dataset.value;
    switch (type) {
        case 'color':
            option.style.backgroundColor = value;
            break;
        case 'gradient':
            option.style.backgroundImage = value;
            break;
        case 'image':
            option.style.backgroundImage = 'url(' + value + ')';
            break;
    }
    option.addEventListener('click', function() {
        const type = this.dataset.type;
        const value = this.dataset.value;
        switch (type) {
            case 'color':
                body.style.backgroundColor = value;
                body.style.backgroundImage = 'none';
                break;
            case 'gradient':
                body.style.backgroundImage = value;
                body.style.backgroundColor = 'none';
                break;
            case 'image':
                body.style.backgroundImage = 'url(' + value + ')';
                body.style.backgroundColor = 'none';
                break;
        }
        modal.style.display = 'none';
    });
});