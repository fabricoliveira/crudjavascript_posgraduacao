let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();
});

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    let form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertNewName(newName) {
        globalNames = [...globalNames, newName];
    }

    function updateName(newName) {
        globalNames[currentIndex] = newName;
    }
    
    function handleTyping(event) {
        let hasText = !!event.target.value && event.target.value.trim();

        if(!hasText) {
            clearInput();
            return;
        }

        if(event.key === 'Enter') {
            if(isEditing) {
                updateName(event.target.value);
            } else {
                insertNewName(event.target.value);
            }
            isEditing = false;
            render();
        }
    }

    inputName.focus();
    inputName.addEventListener('keyup', handleTyping);
}

function render() {
    function createDeleteButton(index) {
        function deleteName() {
            globalNames = globalNames.filter((_, i) => i !== index);
            render();
        }
        let button = document.createElement('button');
        button.classList.add('deleteButton');
        button.addEventListener('click', deleteName);
        button.textContent = 'X';
        return button;
    }

    function createSpan(name, index) {
        function editItem() {
            isEditing = true;
            inputName.value = name;
            inputName.focus();
            currentIndex = index;
        }
        let span = document.createElement('span');
        span.textContent = name;
        span.classList.add('clickable');
        span.addEventListener('click', editItem);
        return span;
    }

    let divNames = document.querySelector('#names');
    divNames.innerHTML = '';
    let ul = document.createElement('ul');
    
    globalNames.forEach(function(name, index){
        let li = document.createElement('li');
        let button = createDeleteButton(index);
        let span = createSpan(name, index);

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    });

    divNames.appendChild(ul);
    clearInput();
}

const clearInput = () => {
    inputName.value = '';
    inputName.focus();
}