import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

/*const transporter = {
    auth: {
        // Update your SendGrid API key here
        api_key: '...'
    }
}

const mailer = nodemailer.createTransport(sgTransport(transporter));*/
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  
  let accounts = 
  [{
    service: 'Gmail',
    user:'bebetovictor@gmail.com',
    pass:'bblwxdswiwcwgglz'
  },
  {
    service: 'Gmail',
    user:'bebetovictor@gmail.com',
    pass:'bblwxdswiwcwgglz'
  },
  {
    service: 'Gmail',
    user:'bebetovictor@gmail.com',
    pass:'bblwxdswiwcwgglz'
  }]

export default async (req, res) => {
    // console.log(req.body)

    const {name, email, number, subject, text} = req.body;

    const account = accounts[getRandomInt(accounts.length)]
    let transporter = nodemailer.createTransport({
        service: account.service,
        auth: {
          user: account.user,
          pass: account.pass, // generated ethereal password
        },
    });

    const data = {
        // Update your email here
        to: '08083206@uagro.mx',
        from: email,
        subject,
        text: text,
        html: `
            <b>From:</b> ${name} <br /> 
            <b>Number:</b> ${number} <br /> 
            <b>Subject:</b> ${subject} <br /> 
            <b>Message:</b> ${text} 
        ` 
    };
    try {
        const response = await transporter.sendMail(data);
        console.log(response)
        res.status(200).send("Email send successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error proccessing charge");
    }
}