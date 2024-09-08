let routines = localStorage.getItem('routines')

routines = JSON.parse(routines)

// console.log(routines);
// [0, name, time, priority, isHighlighted]

const tbody = document.querySelector('tbody')

const modal = document.querySelector('.modal')
const editModal = document.querySelector('.edit')


const handleNew = (event) => {
    modal.style.display = 'block'
}

const handleEdit = (event) => {
    editModal.style.display = 'block'
    const btn = event.target
    let id = btn.closest('.entry').children[0].innerHTML
    id = Number(id)
    let name = btn.closest('.entry').children[1].innerHTML
    let time = btn.closest('.entry').children[2].innerHTML
    localStorage.setItem('edit-id', id)
    const nameInput = editModal.querySelector('#editName')
    const timeInput = editModal.querySelector('#editTime')
    nameInput.value = name
    timeInput.value = time
}

const handleClose = (event) => {
    modal.style.display = 'none'
}

const handleEditClose = (event) => {
    editModal.style.display = 'none'
}

const handleConfirm = (event) => {
    const name = modal.querySelector('#name').value
    const time = modal.querySelector('#time').value
    if (routines === null || routines.length === 0) {
        routines = [[0, name, time, [], false]]
        localStorage.setItem('routines', JSON.stringify(routines))
        location.reload()
    }
    else {
        const id = routines[routines.length - 1][0]
        console.log(id);
        let routine = [id + 1, name, time, [], false]
        routines.push(routine)
        localStorage.setItem('routines', JSON.stringify(routines))
        location.reload()
    }
}

const handleEditConfirm = (event) => {
    let id = JSON.parse(localStorage.getItem('edit-id'))
    id = Number(id)
    console.log(id);
    let outIndex = -1
    let idHighlighted = false
    let status = []

    for (let index = 0; index < routines.length; index++) {
        if (routines[index][0] === id) {
            isHighlighted = routines[index].at(-1)
            outIndex = index
            status = routines[index][3]
            break
        }
    }

    const name = editModal.querySelector('#editName').value
    const time = editModal.querySelector('#editTime').value

    let routine = [id, name, time, status, idHighlighted]


    routines[outIndex] = routine
    localStorage.setItem('routines', JSON.stringify(routines))
    location.reload()

}

const handleHighlight = (event) => {
    const btn = event.target
    const row = btn.closest('.entry')

    if (row.style.backgroundColor != 'pink') {
        row.style.backgroundColor = 'pink'

    }
    else {
        row.style.backgroundColor = ''
    }

    let id = row.children[0].innerHTML
    id = Number(id)
    for (let index = 0; index < routines.length; index++) {
        if (routines[index][0] === id) {
            routines[index][4] = !routines[index][4]
            localStorage.setItem('routines', JSON.stringify(routines))
            break
        }
    }
}

const deleteBadge = (event) => {
    const target = event.target
    const text = target.innerHTML
    let id = target.closest('.entry').children[0].innerHTML
    id = Number(id)

    let textToNumber = {
        'low' : 1,
        'middle':2,
        'high':3
    }

    let targetNumber = textToNumber[text]
    console.log(targetNumber);

    for(let i = 0; i < routines.length; i++){
        if(routines[i][0] === id){
            console.log('found!, index = ', i);
            for(let j = 0; j < routines[i][3].length; j++){
                if(routines[i][3][j] === targetNumber){
                    console.log('found!, index of routine = ', j);
                    routines[i][3].splice(j, 1)
                    localStorage.setItem('routines', JSON.stringify(routines))
                    break
                }
            }
            break
        }
        
    }
    location.reload()
}

const handleDelete = (event) => {
    if (!confirm("are you sure?"))
        return

    const btn = event.target
    const row = btn.closest('.entry')

    let id = row.children[0].innerHTML
    id = Number(id)
    let outIndex = -1
    for (let index = 0; index < routines.length; index++) {
        if (routines[index][0] === id) {
            outIndex = index
            break
        }
    }

    routines.splice(outIndex, 1)

    localStorage.setItem('routines', JSON.stringify(routines))
    location.reload()
}



if (routines !== null) {
    routines.forEach((routine, indexOfRoutines) => {
        const tr = document.createElement('tr')
        tr.className = 'entry'
        const id = routine[0]
        routine.forEach((field, index) => {
            const td = document.createElement('td')

            if (index === 4) {
                td.innerHTML = `<ul class="actions">
                                    <li>
                                        <button onclick="handleHighlight(event)">
                                            highlight
                                        </button>
                                    </li>
                                    <li>
                                        <button onclick="handleEdit(event)">
                                            edit
                                        </button>
                                    </li>
                                    <li>
                                        <button onclick="handleDelete(event)">
                                            delete
                                        </button>
                                    </li>
                                </ul>`
                if (field === true) {
                    tr.style.backgroundColor = 'pink'
                }

                tr.appendChild(td)
                return
            }

            td.innerHTML = field
            if (index === 3) {
                td.className = 'droppable'
                td.innerHTML = ''
                for(let i = 0; i < routine[3].length; i++){
                    let number = routine[3][i]
                    const badge = document.createElement('span')
                    badge.className = 'badge'
                    let table = {
                        1: 'low',
                        2: 'middle',
                        3: 'high'
                    }
                    const inner = table[number]
                    badge.innerHTML = inner
                    badge.onclick = (event) =>{
                        deleteBadge(event)
                    }
                    td.appendChild(badge)
                }
            }
            tr.appendChild(td)
        })
        tbody.appendChild(tr)

    })
}

const badges = document.querySelectorAll('.badges li');
const droppableAreas = document.querySelectorAll('.droppable');

// Add event listeners for dragstart, dragover, dragenter, dragleave, and drop events
badges.forEach(badge => {
    badge.addEventListener('dragstart', (event) => {
        // Store the text content of the badge to be used on drop
        event.dataTransfer.setData('text/plain', event.target.textContent);
    });
});

droppableAreas.forEach(area => {
    area.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow drop
        area.classList.add('over'); // Add class to indicate drag-over
    });

    area.addEventListener('dragleave', () => {
        area.classList.remove('over'); // Remove class when dragging leaves
    });

    area.addEventListener('drop', (event) => {
        event.preventDefault();
        const badgeText = event.dataTransfer.getData('text/plain');
        createBadgeCopy(badgeText, area); // Create and append badge copy
        area.classList.remove('over'); // Remove drag-over class
    });
});

function createBadgeCopy(badgeText, container) {
    // Create a new span element to act as the badge copy
    const row = container.closest('.entry')
    let id = row.children[0].innerHTML
    id = Number(id)

    let table = {
        'low' : 1,
        'middle' : 2,
        'high' : 3
    }

    let outIndex = -1
    for(let i = 0; i < routines.length; i++){
        if(routines[i][0] === id){
            outIndex = i
            break
        }
    }
    

    for(let i = 0; i < container.children.length; i++){
        if(container.children[i].textContent === badgeText){
            return
        }
    }
    

    const badgeCopy = document.createElement('span');
    badgeCopy.textContent = badgeText;
    badgeCopy.className = 'badge';
    badgeCopy.onclick = (event) => {
        deleteBadge(event)
    }

    // Append the badge copy to the container
    container.appendChild(badgeCopy);
    // console.log(table[badgeText]);
    routines[outIndex][3].push(table[badgeText])
    routines[outIndex][3].sort()
    localStorage.setItem('routines', JSON.stringify(routines))
}

const highlightBtns = document.querySelectorAll('.highlight-btn')

highlightBtns.forEach((highlightBtn) => {
    highlightBtn.addEventListener('click', (event) => {
        const row = highlightBtn.closest('.entry')
        // console.log(row);
        if (row.style.backgroundColor != 'pink') {
            row.style.backgroundColor = 'pink'

        }
        else {
            row.style.backgroundColor = ''
        }
    })
})





