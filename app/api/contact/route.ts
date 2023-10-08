import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    // Fetch data from contact form
    const data = await req.json()
    
    // Initialize the configs for nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GAMIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    // the template for contacts
    const template = {
        from: data.email,
        to: 'haseakito@gmail.com',
        subject: `Contact from ${ data.email}`,
        text: `${ data.subject } Send from ${ data.email }`,
        html:
        `        
        <p>Email Address</p>
        ${ data.email }
        <p>Subject</p>
        ${ data.subject }
        <p>Details<p/>
        ${ data.details }
        `
    }

    // Send an email
    await transporter.sendMail(template)
    .then(() => {
        return NextResponse.json('Your contact sent succcessfully!' , {
            status: 200
        })
    })
    .catch((err) => {
        // Return an error
        return NextResponse.json(err, {
            status: 500
        })
    })
}