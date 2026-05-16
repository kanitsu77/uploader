
const multer = require('multer')
const axios = require('axios')
const FormData = require('form-data')
const FileType = require('file-type')

const upload = multer()

async function Termai(buffer) {
    const type = await FileType.fromBuffer(buffer)
    const ext = type?.ext || 'bin'

    const form = new FormData()
    form.append('file', buffer, {
        filename: 'file.' + ext
    })

    try {
        const { data } = await axios.post(
            'https://c.termai.cc/api/upload?key=AIzaBj7z2z3xBjsk',
            form,
            {
                headers: form.getHeaders()
            }
        )

        return data.path
    } catch (e) {
        console.log(e.response?.data || e.message)
        throw 'Upload gagal'
    }
}

module.exports = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(200).json({
            status: true,
            message: 'API uploader aktif'
        })
    }

    upload.single('file')(req, res, async(err) => {

        if (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            })
        }

        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: 'File tidak ditemukan'
            })
        }

        try {

            const result = await Termai(req.file.buffer)

            res.status(200).json({
                status: true,
                result
            })

        } catch (e) {

            res.status(500).json({
                status: false,
                message: e.toString()
            })

        }

    })
}
