const sgMail = require(`@sendgrid/mail`);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: `will.ulman@gmail.com`,
    subject: `Welcome to Recipe Manager!`,
    text: `Hello, ${name}! Hope you enjoy keeping track of your recipes. Let me know how you get along with the app. :)`
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: `will.ulman@gmail.com`,
    subject: `We're sorry to see you go!`,
    text: `It was good having you around, ${name}. Let us know if there's anything we could have done better to keep you around.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail
};
