const express = require("express")
const open = require("open")
const path = require("path")

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'dist')))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`)
  open(`http://localhost:${port}`)
})
