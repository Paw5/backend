import { Router } from 'express';

const router = Router();

export const getPicture = (req, res) => {
  if (!req.params.fileName.match(/.+\.(png|jpg)$/i)) {
    res.statusCode = 404;
    res.send();
    return 1;
  }
  // continue
  res.statusCode = 200;
  return 0;
};

router.get('/', getPicture);

export default router;
