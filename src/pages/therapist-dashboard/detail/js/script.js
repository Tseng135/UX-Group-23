const urlParams = new URLSearchParams(window.location.search);

const entryId = urlParams.get('id');
const entryName = urlParams.get('name');

console.log('Entry ID:', entryId); 
console.log('Entry Name:', entryName); 


const entryDetail = document.getElementById('entry-detail')

entryDetail.innerHTML = `welcome back, your id is: ${entryId}, your name is ${entryName}! 
<br>
<br>
<br>
<div>
    detail detail detail
    detail detail detail
    detail detail detail
    detail detail detail
    detail detail detail
    detail detail detail
    detail detail detail
</div>
`