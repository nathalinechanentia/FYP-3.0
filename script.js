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
        combineContents(targetBox);
    }
}
function combineContents(box) {
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
        const newContent = document.createElement('div');
        newContent.classList.add('content', 'food1');
        newContent.textContent = 'Food 1';
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
            combineContents(dropTarget);
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