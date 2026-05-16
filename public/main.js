
async function uploadFile() {

    const fileInput = document.getElementById('file')
    const result = document.getElementById('result')

    const file = fileInput.files[0]

    if (!file) {
        alert('Pilih file dulu')
        return
    }

    const form = new FormData()
    form.append('file', file)

    result.style.display = 'block'
    result.innerHTML = 'Uploading...'

    try {

        const req = await fetch('/api/upload', {
            method: 'POST',
            body: form
        })

        const res = await req.json()

        if (!res.status) {
            result.innerHTML = 'Upload gagal'
            return
        }

        result.innerHTML = `
URL:
<br><br>

<a href="${res.result}" target="_blank">
${res.result}
</a>

<img src="${res.result}">
`

    } catch (e) {

        result.innerHTML = 'Terjadi 
