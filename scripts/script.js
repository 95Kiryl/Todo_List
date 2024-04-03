'use strict'

const inputTodo = document.querySelector('.todo'),
    btnAddTodo = document.querySelector('.addTodo'),
    update = document.querySelector('.updateTodo'),
    divTodoList = document.querySelector('.todo__list__items');

let idNewTask = 0,
    arrayTask = [],
    remove = null,
    arrayNonActive = [],
    arrayActive = [],
    checkbox = null;


const addNewClasses = (event) => {
    for (let i = 0; i < checkbox.length; i++) {
        if (event.currentTarget.id === checkbox[i].id) {
            checkbox[i].classList.toggle('checked');
            checkbox[i].parentElement.classList.toggle('disable');
            arrayTask.forEach((task) => {
                if (task.id === checkbox[i].id &&
                    checkbox[i].classList.contains('checked')) {
                    task.active = true;
                } else if (task.id === checkbox[i].id &&
                    !checkbox[i].classList.contains('checked')) {
                    task.active = false;
                }
            })
            break;
        }
    }
};


const removeElements = (e) => {
    for (let j = 0; j < remove.length; j++) {
        if (e.currentTarget.id === remove[j].id) {
            remove[j].parentElement.remove();
            arrayTask = arrayTask.filter(removeTask => removeTask.id !== remove[j].id);
            checkbox = document.querySelectorAll('.checkbox');
            remove = document.querySelectorAll('.remove');
            break;
        }
    }
};


btnAddTodo.addEventListener('click', () => {
    if (inputTodo.value === '') {
        return;
    } else {
        idNewTask++;

        let createNewTask = {
            newTask: `
            <div class='newTask' id='${idNewTask}'>
            <div class='checkbox' id='${idNewTask}'></div>
            <div class='newTask__content'>${inputTodo.value}</div>
            <div class='remove' id='${idNewTask}'></div>
            </div>`,
            id: `${idNewTask}`,
            active: false
        }

        arrayTask.push(createNewTask);
        let lastElementArray = arrayTask[arrayTask.length - 1];
        divTodoList.insertAdjacentHTML('afterbegin', lastElementArray.newTask);
        inputTodo.value = '';

        checkbox = document.querySelectorAll('.checkbox');
        checkbox[0].addEventListener('click', (event) => {
            addNewClasses(event);
        });

        remove = document.querySelectorAll('.remove');
        remove[0].addEventListener('click', (e) => {
            removeElements(e);
        });
    }
});


update.addEventListener('click', () => {
    arrayActive = arrayTask.filter(taskActive => taskActive.active);
    arrayNonActive = arrayTask.filter(taskActive => !taskActive.active);

    divTodoList.innerHTML = '';

    arrayActive.forEach(divActive => divTodoList.insertAdjacentHTML('afterbegin', divActive.newTask));
    checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(check => {
        check.classList.add('checked');
        check.parentElement.classList.add('disable');
    });

    arrayNonActive.forEach(divNonActive => divTodoList.insertAdjacentHTML('afterbegin', divNonActive.newTask));

    arrayTask = arrayActive.concat(arrayNonActive);
    arrayActive = [];
    arrayNonActive = [];

    checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(addCheck => {
        addCheck.addEventListener('click', (event) => {
            addNewClasses(event);
        })
    });

    remove = document.querySelectorAll('.remove');
    remove.forEach(addRemove => {
        addRemove.addEventListener('click', (e) => {
            removeElements(e);
        })
    });
});
