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

let previousMinute = null;

function updateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const currentMinute = now.getMinutes();

    // Only update the text and animate if the minute has changed
    if (currentMinute !== previousMinute) {
        document.getElementById('date').textContent = date;
        document.getElementById('time').textContent = time;
        document.getElementById('time').style.animation = 'none';
        setTimeout(function () {
            document.getElementById('time').style.animation = '';
        }, 10);
        previousMinute = currentMinute;
    }
}

// Update the time immediately, and then every minute
updateTime();
setInterval(updateTime, 60000);

document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const tasksContainer = document.getElementById('tasks');
    const taskElement = document.createElement('p');
    taskElement.textContent = taskInput.value;
    tasksContainer.appendChild(taskElement);
    taskInput.value = '';
    document.getElementById('date-time-container').classList.add('fade-out');
    document.querySelector('.input-container').classList.add('move-up');
});

// When a background option is selected
document.querySelectorAll('.background-option').forEach(function(option) {
    option.addEventListener('click', function() {
        const backgroundValue = this.dataset.value;
        const type = this.dataset.type;

        if (type === 'color') {
            document.body.style.backgroundColor = backgroundValue;
            document.body.style.backgroundImage = '';
        } else if (type === 'gradient' || type === 'image') {
            document.body.style.backgroundImage = backgroundValue.includes('gradient') ? backgroundValue : `url(${backgroundValue})`;
            document.body.style.backgroundColor = '';
        }

        // Save the background value in local storage
        localStorage.setItem('backgroundValue', backgroundValue);
        localStorage.setItem('backgroundType', type);
    });
});

// When the page loads
window.onload = function() {
    // Get the saved background value and type from local storage
    const savedBackgroundValue = localStorage.getItem('backgroundValue');
    const savedBackgroundType = localStorage.getItem('backgroundType');

    // If there is a saved background value, use it as the background
    if (savedBackgroundValue) {
        if (savedBackgroundType === 'color') {
            document.body.style.backgroundColor = savedBackgroundValue;
            document.body.style.backgroundImage = '';
        } else if (savedBackgroundType === 'gradient' || savedBackgroundType === 'image') {
            document.body.style.backgroundImage = savedBackgroundValue.includes('gradient') ? savedBackgroundValue : `url(${savedBackgroundValue})`;
            document.body.style.backgroundColor = '';
        }
    }
};