

async function uploadFile() {

    const fileInput = document.getElementById('file')
    const result = document.getElementById('result')

    const file = fileInput.files[0]

    if (!file) return alert('Pilih file')

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

        console.log(res)

        if (!res.status) {
            result.innerHTML = res.message
            return
        }

        result.innerHTML = `
<a href="${res.result}" target="_blank">
${res.result}
</a>
`

    } catch (e) {

        result.innerHTML = 'Error upload'

    }

        }
