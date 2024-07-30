const express = require("express")
const app = express()

const port = process.env.port || 3000

const path = require("path")
const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');
const viewsDirectory = path.join(__dirname, "../hbs/views")
app.set("views", viewsDirectory)

const hbs = require("hbs")
const partialsDirectory = path.join(__dirname, "../hbs/partials")
hbs.registerPartials(partialsDirectory)

app.get("/", (req, res) => {
    res.render("index", {
        page: "Weather app"
    })
})

const geocode = require("./api/geocode")
const forecast = require("./api/forecast")

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return ({
            error: "you must provide address"
        })
    } else {
        geocode.geocodefun(req.query.address, (error, data) => {
            if (error) {
                return res.send({ error })
            } else {
                forecast.forecustfun(data.longtitude, data.latitude, (error, foreData) => {
                    if (error) {
                        return res.send({ error })
                    } else {
                        console.log(foreData)
                        res.send({
                            country: foreData.country,
                            longtitude: data.longtitude,
                            latitude: data.latitude,
                            condition: foreData.condition,
                            temp: foreData.temp
                        })
                    }
                })
            }
        })
    }
})




app.get("*", (req, res) => {
    res.send("Error can't find page")
})

app.listen(port, () => {
    console.log(`app run at port ${port} :)`)
})










