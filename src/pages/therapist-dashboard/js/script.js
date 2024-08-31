// script.js

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
    // badgeCopy.style.padding = '5px 10px';
    // badgeCopy.style.backgroundColor = '#007bff';
    // badgeCopy.style.color = 'white';
    // badgeCopy.style.borderRadius = '3px';
    // badgeCopy.style.display = 'inline-block';
    // badgeCopy.style.margin = '5px';

    // Append the badge copy to the container
    container.appendChild(badgeCopy);
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

const detailBtns = document.querySelectorAll('.detail-btn')

detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // window.location.href = './detail/index.html'
        // 获取按钮所在行的父元素 (tr)
        const row = btn.closest('tr');

        // 获取 ID 和名字（假设 ID 在第一个 <td>，名字在第二个 <td>）
        const entryId = row.children[0].textContent.trim();
        const entryName = row.children[1].textContent.trim();

        // 构建 URL，附加查询参数
        const url = new URL('./detail/index.html', window.location.href);
        url.searchParams.set('id', entryId);
        url.searchParams.set('name', entryName);

        // 导航到新页面
        window.location.href = url.toString();
    })
})