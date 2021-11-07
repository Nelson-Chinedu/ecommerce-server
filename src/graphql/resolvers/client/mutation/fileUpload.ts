import winstonEnvLogger from 'winston-env-logger';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

import IContext from '../../../../interface/IContext';
import { Account } from '../../../../db';
import { ForbiddenError } from 'apollo-server-errors';
import { AccountType } from '../../../../db/entity/Account';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

interface IArgs {
  file: any;
}

const MIMETYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileUpload = async (
  _parent: unknown,
  { file }: IArgs,
  { user: { id } }: IContext
) => {
  if (!file) throw new ForbiddenError('File upload missing');
  try {
    const { createReadStream, mimetype } = await file;

    if (!MIMETYPES.includes(mimetype.toLowerCase()))
      throw new ForbiddenError('Invalid file format');

    const account = await Account.findOne({
      where: {
        id,
      },
    });
    if (!account || (account && account.accountType !== AccountType.MERCHANT)) {
      throw new ForbiddenError('Permission denied');
    } else if (account && account.blocked) {
      throw new ForbiddenError('Account blocked, kindly contact support');
    }

    const response: UploadApiResponse | UploadApiErrorResponse | undefined =
      await new Promise((resolve, reject) => {
        createReadStream().pipe(
          cloudinary.uploader.upload_stream(
            { folder: 'multibuy' },
            (error, result) => {
              if (error) {
                reject(error);
              }
              resolve(result);
            }
          )
        );
      });
    if (response) {
      const { secure_url } = response;

      return { url: secure_url };
    }
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default fileUpload;
