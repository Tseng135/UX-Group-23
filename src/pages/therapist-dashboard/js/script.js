// script.js



const tbody = document.querySelector('tbody')

let entries = localStorage.getItem('entries')

if (entries !== null) {
    entries = JSON.parse(entries)

    entries.forEach((entry) => {
        let row = document.createElement('tr')
        row.className = 'entry'

        entry.forEach((field, index) => {
            if (index === entry.length - 1) {
                if (field === true) {
                    if (row.style.backgroundColor != 'pink') {
                        row.style.backgroundColor = 'pink'

                    }
                    else {
                        row.style.backgroundColor = ''
                    }
                }
                return
            }


            let td = document.createElement('td')
            if (index === 2) {
                td.className = 'droppable'

            }
            td.innerHTML = field
            row.appendChild(td)

            if (index === entry.length - 2) {
                let actionTd = document.createElement('td')
                actionTd.innerHTML = `
                <ul class="actions">
                    <li>
                        <button onclick="handleHighlight(event)" class="highlight-btn">
                            highlight
                        </button>
                    </li>
                    <li>
                        <button onclick="handleDetail(event)" class="detail-btn">
                            detail
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
                row.appendChild(actionTd)
                // console.log(row);
            }

        })

        tbody.appendChild(row)

    })

}

const handleEdit = (event) => {
    modal.style.display = "block";
    const btn = event.target
    const row = btn.closest('.entry')
    // console.log(row);

    let id = row.children[0].innerHTML   
    let name = row.children[1].innerHTML 
    id = Number(id)
    // console.log(id);
    // console.log(name);

    const modalID = document.querySelector('#ID')
    // console.log(modalID);
    modalID.innerHTML = id
    const modalInput = modal.querySelector('input')
    // console.log(modalInput);
    modalInput.value = name




}

const handleConfirm = (event) => {
    const btn = event.target
    const name = modal.querySelector('input').value
    let id = modal.querySelector('#ID').innerHTML
    id = Number(id)
    // console.log(id, name);
    for(let i = 0; i < entries.length; i++){
        let entry = entries[i]
        // console.log(entry);
        if(entry[0] === id){
            entries[i][1] = name
            localStorage.setItem('entries', JSON.stringify(entries))
            modal.style.display = 'none'
            break
        }
    }
    window.location.reload()
    
}

// Get the modal element
const modal = document.getElementById("editModal");

// Get the edit button that opens the modal
const editBtn = document.querySelector(".edit-btn");

// Get the <span> element that closes the modal
const closeBtn = document.querySelector(".close");

// Get the save button inside the modal
const saveBtn = document.getElementById("saveBtn");


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
    const badgeCopy = document.createElement('span');
    badgeCopy.textContent = badgeText;
    badgeCopy.className = 'badge';
    badgeCopy.onclick = (event) => {
        const self = event.target
        const droppable = self.closest('.droppable')
        
        self.remove()
        if(droppable.children.length == 0){
            droppable.innerHTML = '&nbsp;'
        }
    }


    const childrenElements = Array.from(container.children)

    const hasDuplicate = childrenElements.some((item) => {
        if (item.innerHTML == badgeText) {
            return true
        }
    })
    if (hasDuplicate) return

    container.innerHTML = ''

    childrenElements.push(badgeCopy)

    const priority = {
        'small': 1,
        'middle': 2,
        'severe': 3
    };

    const sortedChildren = childrenElements.sort((a, b) => {
        const textA = a.innerHTML.trim();
        const textB = b.innerHTML.trim();

        const priorityA = priority[textA] || 0;
        const priorityB = priority[textB] || 0;

        return priorityA - priorityB;
    });

    const currentId = Number(container.closest('.entry').children[0].innerHTML)
    // console.log(currentId);
    let status = ''
    sortedChildren.forEach((item) => {
        container.appendChild(item)
        status += item.outerHTML
        // console.log(item.outerHTML);
        // console.log(JSON.stringify(item));
    })
    // console.log(status);
    for (let i = 0; i < entries.length; i++) {
        if (entries[i][0] === currentId) {
            entries[i][2] = status
            console.log(entries[i]);
        }
    }
    localStorage.setItem('entries', JSON.stringify(entries))


}

const handleHighlight = (event) => {
    const highlightBtn = event.target
    const row = highlightBtn.closest('.entry')
    const currentId = Number(row.children[0].innerHTML)
    if (row.style.backgroundColor != 'pink') {
        row.style.backgroundColor = 'pink'
        for (let i = 0; i < entries.length; i++) {
            if (entries[i][0] === currentId) {
                entries[i][entries[i].length - 1] = true
            }
        }
    }
    else {
        row.style.backgroundColor = ''
        for (let i = 0; i < entries.length; i++) {
            if (entries[i][0] === currentId) {
                entries[i][entries[i].length - 1] = false
            }
        }
    }
    localStorage.setItem('entries', JSON.stringify(entries))


}

const handleDetail = (event) => {
    const btn = event.target
    const row = btn.closest('tr');

    // 获取 ID 和名字（假设 ID 在第一个 <td>，名字在第二个 <td>）
    const entryId = row.children[0].textContent.trim();
    const entryName = row.children[1].textContent.trim();
    const status = row.children[2]
    const isHighlight = row.style.backgroundColor == 'pink'
    console.log(isHighlight);
    // console.log(status.children.length);

    // console.log(status.children);
    // if (status.children.length !== 0) {
    //     for (let i = 0; i < status.children.length; i++) {
    //         console.log(status.children[i].innerHTML);
    //     }
    // }


    // 构建 URL，附加查询参数
    const url = new URL('./detail/index.html', window.location.href);
    url.searchParams.set('id', entryId);
    url.searchParams.set('name', entryName);
    if (status.children.length !== 0) {
        for (let i = 0; i < status.children.length; i++) {
            // console.log(status.children[i].innerHTML);
            url.searchParams.set(status.children[i].innerHTML, true);
        }
    }
    url.searchParams.set('isHighlight', isHighlight);


    // 导航到新页面
    window.location.href = url.toString();
}

const handleDelete = (event) => {
    if(!confirm('are you sure?')){
        return
    }
    const btn = event.target
    const row = btn.closest('.entry')
    const currentId = row.children[0].innerHTML
    let entries = localStorage.getItem('entries')
    entries = JSON.parse(entries)
    entries = entries.filter((item, index) => {
        return item[0] !== Number(currentId)
    })

    localStorage.setItem('entries', JSON.stringify(entries))
    window.location.reload()
}


const newBtn = document.querySelector('.new-btn')

newBtn.addEventListener('click', () => {
    handleNew()
})

const handleNew = () => {
    let entries = localStorage.getItem('entries')
    if (entries === null || entries === "[]") {

        const info = [[0, 'smith', '&nbsp;', false]]

        localStorage.setItem('entries', JSON.stringify(info))
        window.location.reload()
        return
    }
    entries = JSON.parse(entries)
    const lastIndex = entries.at(-1)[0]
    console.log(lastIndex);

    const newRow = [lastIndex + 1, 'smith', '&nbsp;', false]
    entries.push(newRow)
    localStorage.setItem('entries', JSON.stringify(entries))

    window.location.reload()

}


// popup



// When the user clicks the edit button, open the modal
editBtn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks the save button, save the data and close the modal
saveBtn.onclick = function () {
    const editedValue = document.getElementById("editInput").value;
    console.log("New value:", editedValue); // Do something with the new value
    modal.style.display = "none"; // Close modal after saving
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

