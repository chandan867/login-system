const nodemailer=require('nodemailer')
 const  verify=(nam,email,confirmationCode)=>{

    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user:"vivekans2016@gmail.com",
          pass: '851135@bihat',
        },
      });

      try
      {
        transport.sendMail({
            from: "vivekans2016@gmail.com",
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
                <h2>Hello ${nam}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:4000/confirm/${confirmationCode}> Click here</a>
                </div>`,
          })
        }
        catch(error)
        {
                  console.log(error)
        }
      
    
}
module.exports=verify