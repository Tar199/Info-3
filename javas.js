document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.querySelector('.list');
    const pendingListContainer = document.querySelector('.pending-list');
    const completedListContainer = document.querySelector('.completed-list');

    const addButton = document.getElementById('button');
    const inputField = document.querySelector('input[name=checkListItem]');
    const clearButton = document.getElementById('clear-button');

    addButton.addEventListener('click', function() {
        const taskText = inputField.value;
        addTask(taskText);
        inputField.value = '';
    });

    clearButton.addEventListener('click', function() {
        clearTasks(listContainer);
        clearTasks(pendingListContainer);
        clearTasks(completedListContainer);
    });

    function addTask(text) {
        const taskElement = createTaskElement(text);
        listContainer.appendChild(taskElement);
        pendingListContainer.appendChild(taskElement.cloneNode(true));
    }

    function createTaskElement(text) {
        const taskElement = document.createElement('div');
        taskElement.className = 'item';
        taskElement.textContent = text;

        taskElement.addEventListener('dblclick', function() {
            const originalText = this.textContent;
            const inputField = document.createElement('input');
            inputField.className = 'edit-input';
            inputField.value = originalText;
        
            // Set the size of the input field here
            inputField.style.width = '300px'; // Adjust the width as needed
        
            this.innerHTML = '';
            this.appendChild(inputField);
            inputField.focus();
        
            inputField.addEventListener('keyup', function(event) {
                if (event.keyCode === 13) { // Enter key
                    const newText = inputField.value;
                    taskElement.textContent = newText;

                    // Update the corresponding task in pending list
                    const correspondingPendingTask = pendingListContainer.querySelector(`[data-id="${taskElement.getAttribute('data-id')}"]`);
                    if (correspondingPendingTask) {
                        correspondingPendingTask.textContent = newText;
                    }
                }
            });
        });

        taskElement.setAttribute('data-id', Date.now()); // Unique ID
        return taskElement;
    }

    function clearTasks(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    pendingListContainer.addEventListener('click', function(event) {
        const clickedTask = event.target;
        if (clickedTask.classList.contains('item')) {
            const taskText = clickedTask.textContent;
            completedListContainer.appendChild(createCompletedTaskElement(taskText));
            clickedTask.remove();
        }
    });

    completedListContainer.addEventListener('click', function(event) {
        const clickedTask = event.target;
        if (clickedTask.classList.contains('completed-item')) {
            clickedTask.remove();
        }
    });

    function createCompletedTaskElement(text) {
        const taskElement = document.createElement('div');
        taskElement.className = 'completed-item';
        taskElement.textContent = text;
        return taskElement;
    }
});