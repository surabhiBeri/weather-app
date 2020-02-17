const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine',"hbs")
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Surabhi"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Surabhi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Surabhi',
        helpText:'This is a weather app. It gives the weather report of the location.'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:forecastData,
                location:req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error',
        name:'Surabhi',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error',
        name:'Surabhi',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})