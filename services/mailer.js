import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "fjaviroca@gmail.com", //your gmail account you used to set the project up in google cloud console"
         clientId: "358988938766-56fq1tt47qnok97um0b6ecgpgs46p4li.apps.googleusercontent.com",
         clientSecret: "Client Secret Here",
         refreshToken: "Refresh Token Here",
         accessToken: myAccessToken //access token variable we defined earlier
    }});