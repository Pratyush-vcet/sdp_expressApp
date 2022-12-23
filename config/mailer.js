const nodemailer = require("nodemailer");

const sendMail = (email,username,  otp) => {
  try {
    const transport = nodemailer.createTransport({
    //   mailer: "gmail",
    host: 'smtp.gmail.com',
    port: '465',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    return transport.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP for email verification",
      html: `
            <div>
            <h2>Hi ${username}</h2>
            <br />
            <h2>Hello from Express project!</h2>
            <br />
            <p>Your OTP for email verification is <strong>${otp}</strong></p>
            <br />
            <h4>Thank You!</h4>
            </div>
            `,
    })
    .then((response) => {
        console.log('email sent', response)
    })
  } catch (error) {
    console.log("error ", error)
  }
};

module.exports = sendMail