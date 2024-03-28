import express from "express"

const app = express()
app.use(express.json())

const PORT = 8000

app.get("/", (req, res) => {
    res.send("Your server is running up")
})


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})