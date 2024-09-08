const urlParams = new URLSearchParams(window.location.search);

const entryId = urlParams.get('id');
const entryName = urlParams.get('name');
const small = urlParams.get('small')
const middle = urlParams.get('middle')
const severe = urlParams.get('severe')
const isHighlight = urlParams.get('isHighlight')

console.log('Entry ID:', entryId);
console.log('Entry Name:', entryName);
console.log('small', small);
console.log('middle', middle);
console.log('severe', severe)

const entryDetail = document.getElementById('entry-detail')

entryDetail.innerHTML = `welcome back, patient id is: ${entryId}, your name is ${entryName}! 
<br>
<br>
<br>
`

let statusStr = 'patient status is:'


const patientStatus = document.getElementById('patient-status')
if (small || middle || severe || isHighlight) {
    if (small) statusStr += 'small '
    if (middle) statusStr += 'middle '
    if (severe) statusStr += 'severe '
    if (isHighlight) statusStr += 'highlighted!'
}
else{
    statusStr += 'safe!'
}

patientStatus.innerHTML = statusStr


const handleClick = () => {
    window.history.back()
}