const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const ul = document.querySelector('#task-list');
const formContainer = document.getElementById('form-container');
const completeAllButton = document.getElementById('complete-all');



// Function to add event listener to a task
function addTaskEventListener(li) {
    li.addEventListener('click', function() {
        this.classList.add('completed');
        const index = tasks.indexOf(this.textContent);
        if (index > -1) {
            tasks.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setTimeout(() => this.remove(), 2000);
    });
}

// Function to update form position
function updateFormPosition() {
    if (tasks.length === 0) {
        formContainer.classList.add('center-form');
    } else {
        formContainer.classList.remove('center-form');
    }
}

// Load tasks from localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    ul.appendChild(li);

    // Add event listener to the task
    addTaskEventListener(li);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const task = input.value;

    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        ul.appendChild(li);

        // Save task to localStorage
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Add event listener to the task
        addTaskEventListener(li);

        input.value = '';
    }
});


completeAllButton.addEventListener('click', function() {
    const listItems = document.querySelectorAll('#task-list li');
    listItems.forEach(li => {
        li.classList.add('completed');
        setTimeout(() => li.remove(), 2000);
    });
    tasks.length = 0;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateFormPosition();
});
// Initial form position
updateFormPosition();


