const express = require('express');
const bodyParser =require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer =require('nodemailer');
var fs = require('fs');

const alert =require('alert-node');


const app =express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())






app.use('/public', express.static('public'));


app.get('/',(req,res)=>{
	res.render('index');
});

app.get('/services',(req,res)=>{
	res.render('services');
});

app.get('/ownprojects',(req,res)=>{
	res.render('ownprojects');
});

app.get('/contacts',(req,res)=>{
	res.render('contacts');
});




app.post('/send',(req,res)=>{
	const output =`

	<p>Заказ</p>
	<ul>
<li>Имя:<br>${req.body.name}</li>
<li>E-mail:<br>${req.body.email}</li>
<li>Услуга:<br>${req.body.selected}</li>
</ul>
<p>Коментарий к заявке:<p>
<p>${req.body.text}<p>

	`;
	nodemailer.createTestAccount((err, account) => {

  let transporter = nodemailer.createTransport({
        host: 'smtp.ukr.net',
        port:  2525,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'artem2011as@ukr.net', // generated ethereal user
            pass: 'kaka2222' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Блог BQ" <artem2011as@ukr.net>', // sender address
        to: 'artem2011as@ukr.net', // list of receivers
        subject: 'Новый заказ с BlondinkaQ Personal Blog', // Subject line
      //  text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
       
    });
});

res.render('services');


});

app.listen(8080,()=>console.log('Server start...'));