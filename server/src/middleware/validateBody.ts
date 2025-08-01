import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export const validateBody = (schema: yup.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  };
};