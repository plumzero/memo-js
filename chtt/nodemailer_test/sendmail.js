
import nodemailer from 'nodemailer';

let html_txt = 
`<table>
<tr>
    <th>帧号</th>
    <th>订单号</th>
    <th>买卖</th>
    <th>成交量</th>
    <th>成交价</th>
</tr>
<tr>
    <td rowspan="3">FRAME1<br>11.5</td>
    <td>A1</td>
    <td>1</td>
    <td>200</td>
    <td>11</td>
</tr>
<tr>
    <td>A2</td>
    <td>1</td>
    <td>400</td>
    <td>12</td>
</tr>
<tr>
    <td>A3</td>
    <td>-1</td>
    <td>300</td>
    <td>11.8</td>
</tr>
</table>`;

async function main() {
    // SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'shouquan@qq.com',
            pass: 'shou-quan-ma'
        }
    });

    // Message Object
    let message = {
        from: '<shouquan@qq.com>',
        // Comma separated list of recipients
        to: [ 'recv@email.com' ],
        bcc: [ 'copy@email.com' ],
        // Subject of the message
        subject: 'Nodemailer is unicode friendly',
        // plaintext body
        text: 'Hello to myself!',
        // HTML body
        html: html_txt,
        // An array of attachments
        attachments: [
            // String attachment
            {
                filename: 'en.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain'       // optional, would be detected from the filename
            },
            {
                filename: 'notes.txt',
                path: './notes.txt',

            },
            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from('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',
                                     'base64'),
                cid: 'note@example.com' // should be as unique as possible
            },
            // File Stream attachment
            {
                filename: 'nyan.gif',
                path: './nyan.gif',
                cid: 'nyan@example.com'     // should be as unique as possible
            }
        ]
    };

    let info = await transporter.sendMail(message);
    console.log('Message send successfully as %s', info.messageId);
}

main().catch(err => {
    console.error(err.message);
    process.exit(-1);
});