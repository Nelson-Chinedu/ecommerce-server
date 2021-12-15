import sgMail from '@sendgrid/mail';
import winstonEnvLogger from 'winston-env-logger';

import IMessage from '../interface/IMessage';

sgMail.setApiKey(process.env.SENDGRID_APIKEY as string);

const sendMail = async (receiver: string, data: IMessage): Promise<void> => {
  const { name, body, verificationLink, route, query } = data;
  try {
    const msg = {
      to: receiver,
      from: 'MultiBuy <no-reply@multibuy.vercel.app>',
      subject: 'MultiBuy - Verification Link <no-reply@multibuy.vercel.app>',
      html: verificationLink
        ? `<p>${name}</p>
             <p>${body} </p>
             <a
              href='${process.env.CLIENT_URL}/auth/${route}?${query}=${verificationLink}'>
                ${verificationLink}
             </a>`
        : `<p>${name}</p>
              <p>${body} </p>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured sending mail',
      error,
    });
    throw new Error('An error occured sending mail');
  }
};

export default sendMail;
