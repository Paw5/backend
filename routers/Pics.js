import { Router } from 'express';
import aws from 'aws-sdk';

import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';

aws.config.update({ region: 'us-east-1' });

const Pics = Router();

Pics.post('/:fileName', async (req, res) => {
  const s3 = new S3({ apiVersion: '2006-03-01' });
  const upload = await new Upload({
    client: s3,

    params: {
      Body: req.body,
      Key: req.params.fileName,
      Bucket: 'paw5-cdn',
      ContentType: req.headers['content-type'],
    },
  }).done();

  res.send(upload);
});

export default Pics;
