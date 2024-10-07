const newModal = document.getElementById('newModal')
const editModal = document.getElementById('editModal')
const groupModal = document.getElementById('groupModal')

function handleNew() {

    newModal.style.display = 'block'
}

function handleClose(event) {
    const target = event.target
    const modal = target.closest('.therapist-modal')
    modal.style.display = 'none'
}

function handleEdit() {
    // console.log(editModal);
    editModal.style.display = 'block'
}

async function handleDelete() {
    const result = confirm('Are you sure?')
    // console.log('hello');
    // console.log(result);
    if (result) {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id'); // 获取 id
        console.log(id);

        try {
            const response = await fetch(`../php/deletepatient.php?id=${id}`, {
                method: 'DELETE', // 设置请求方法为 DELETE
            })

            if (response.ok) {
                alert('成功')
                window.location.href = './therapist-patients.php'
            }
            else {
                alert('失败！')
            }
        } catch (error) {
            alert(error)
        }
    }

}


function handleManage() {
    groupModal.style.display = 'block'
}

function allowDrop(event) {
    event.preventDefault(); // 允许拖放
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.outerHTML); // 将要拖动的元素的 HTML 设置为数据
}

function drop(event) {
    event.preventDefault(); // 防止默认行为
    const data = event.dataTransfer.getData("text"); // 获取拖动的数据

    // 使用 closest 确保目标是 card-body
    console.log(event.target);
    const card = event.target.closest('.card')
    const cardbody = card.querySelector('.card-body')
    if (cardbody) {
        // 将拖动的数据放置到目标位置
        cardbody.innerHTML += data; // 将数据添加到 card-body 内
    } else {
        console.log('出错');
    }
}

async function handleConfirm(){


    // alert('confirm')
    const groups = document.getElementById('groups')
    // console.log(groups);
    const msg1 = groups.querySelector('#group1').innerHTML
    const msg2 = groups.querySelector('#group2').innerHTML
    const msg3 = groups.querySelector('#group3').innerHTML
    let group = 0
    if(msg1 !== '') group = 1
    else if(msg2 !== '') group = 2
    else if(msg3 !== '') group = 3
    else{
        alert('select a group!')
        return
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); // 获取 id


    const formData = new FormData()
    formData.append('id', id)
    formData.append('group', group)

    try {
        const response = await fetch('../php/changegroup.php', {
            method: 'POST',
            body: formData
          })
          if(response.ok){
            alert('成功')
            window.location.reload()
          }
          else{
            alert('失败')

          }
    } catch (error) {
        alert(error)
    }
}