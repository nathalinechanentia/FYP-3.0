function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const targetBox = event.target.closest('.box');

    console.log('Drop event triggered');
    console.log('Dragged Element:', draggedElement);
    console.log('Target Box:', targetBox);

    if (targetBox) {
        targetBox.appendChild(draggedElement);
        console.log('Element appended to target box');
        Recipe1(targetBox);
        Recipe2(targetBox);
        Recipe3(targetBox);
        Recipe4(targetBox);
        Recipe5(targetBox);
    }
}
function Recipe1(box) {
    const ingredient1 = box.querySelector('.ingredient1');
    const ingredient2 = box.querySelector('.ingredient2');
    const ingredient3 = box.querySelector('.ingredient3');

    console.log('Ingredients in box:', ingredient1, ingredient2, ingredient3);

    if (ingredient1 && ingredient2 && ingredient3) {
        // Remove one instance of each ingredient
        ingredient1.remove();
        ingredient2.remove();
        ingredient3.remove();

        // Create the new combined content
        const newContent = document.createElement('img');
        newContent.classList.add('content', 'food1');
        newContent.src = 'images/hakau.png'; // Set the path to your image
        newContent.alt = 'Food 1';
        newContent.draggable = true;
        newContent.ondragstart = drag;

        // Append the new content to the box
        box.appendChild(newContent);

        console.log('New content created and appended:', newContent);
    }
}

function Recipe2(box) {
    const ingredient5 = box.querySelector('.ingredient5');
    const ingredient7 = box.querySelector('.ingredient7');
    const ingredient10 = box.querySelector('.ingredient10');

    console.log('Ingredients in box:', ingredient5, ingredient7, ingredient10);

    if (ingredient5 && ingredient7 && ingredient10) {
        // Remove one instance of each ingredient
        ingredient5.remove();
        ingredient7.remove();
        ingredient10.remove();

        // Create the new combined content
        const newContent = document.createElement('img');
        newContent.classList.add('content', 'food2');
        newContent.src = 'images/cha_siu_bao.png'; // Set the path to your image
        newContent.alt = 'Food 2';
        newContent.draggable = true;
        newContent.ondragstart = drag;

        // Append the new content to the box
        box.appendChild(newContent);

        console.log('New content created and appended:', newContent);
    }
}

function Recipe3(box) {
    const ingredient1 = box.querySelector('.ingredient1');
    const ingredient10 = box.querySelector('.ingredient10');
    const ingredient11 = box.querySelector('.ingredient11');

    console.log('Ingredients in box:', ingredient1, ingredient10, ingredient11);

    if (ingredient1 && ingredient10 && ingredient11) {
        // Remove one instance of each ingredient
        ingredient1.remove();
        ingredient10.remove();
        ingredient11.remove();

        // Create the new combined content
        const newContent = document.createElement('img');
        newContent.classList.add('content', 'food3');
        newContent.src = 'images/cheung_fun.png'; // Set the path to your image
        newContent.alt = 'Food 3';
        newContent.draggable = true;
        newContent.ondragstart = drag;

        // Append the new content to the box
        box.appendChild(newContent);

        console.log('New content created and appended:', newContent);
    }
}

function Recipe4(box) {
    const ingredient6 = box.querySelector('.ingredient6');
    const ingredient7 = box.querySelector('.ingredient7');
    const ingredient8 = box.querySelector('.ingredient8');

    console.log('Ingredients in box:', ingredient6, ingredient7, ingredient8);

    if (ingredient6 && ingredient7 && ingredient8) {
        // Remove one instance of each ingredient
        ingredient6.remove();
        ingredient7.remove();
        ingredient8.remove();

        // Create the new combined content
        const newContent = document.createElement('img');
        newContent.classList.add('content', 'food4');
        newContent.src = 'images/nai_wong_bao.png'; // Set the path to your image
        newContent.alt = 'Food 4';
        newContent.draggable = true;
        newContent.ondragstart = drag;

        // Append the new content to the box
        box.appendChild(newContent);

        console.log('New content created and appended:', newContent);
    }
}

function Recipe5(box) {
    const ingredient3 = box.querySelector('.ingredient3');
    const ingredient4 = box.querySelector('.ingredient4');
    const ingredient9 = box.querySelector('.ingredient9');

    console.log('Ingredients in box:', ingredient3, ingredient4, ingredient9);

    if (ingredient3 && ingredient4 && ingredient9) {
        // Remove one instance of each ingredient
        ingredient3.remove();
        ingredient4.remove();
        ingredient9.remove();

        // Create the new combined content
        const newContent = document.createElement('img');
        newContent.classList.add('content', 'food5');
        newContent.src = 'images/siu_mai.png'; // Set the path to your image
        newContent.alt = 'Food 5';
        newContent.draggable = true;
        newContent.ondragstart = drag;

        // Append the new content to the box
        box.appendChild(newContent);

        console.log('New content created and appended:', newContent);
    }
}

// Touch event handlers
function touchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const target = touch.target;
    if (target.classList.contains('content')) {
        target.classList.add('dragging');
        target.style.position = 'absolute';
        target.style.zIndex = '1000';
        document.body.append(target);
        moveAt(touch.pageX, touch.pageY, target);
    }
}

function touchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const target = document.querySelector('.dragging');
    if (target) {
        moveAt(touch.pageX, touch.pageY, target);
    }
}

function touchEnd(event) {
    event.preventDefault();
    const target = document.querySelector('.dragging');
    if (target) {
        target.classList.remove('dragging');
        target.style.position = '';
        target.style.zIndex = '';
        const dropTarget = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY).closest('.box');
        if (dropTarget) {
            dropTarget.appendChild(target);
            Recipe1(dropTarget);
            Recipe2(dropTarget);
            Recipe3(dropTarget);
            Recipe4(dropTarget);
            Recipe5(dropTarget);
        } else {
            const originalBox = document.getElementById(target.id).parentElement;
            originalBox.appendChild(target);
        }
    }
}

function moveAt(pageX, pageY, element) {
    element.style.left = pageX - element.offsetWidth / 2 + 'px';
    element.style.top = pageY - element.offsetHeight / 2 + 'px';
}

document.addEventListener('touchstart', touchStart, { passive: false });
document.addEventListener('touchmove', touchMove, { passive: false });
document.addEventListener('touchend', touchEnd, { passive: false });