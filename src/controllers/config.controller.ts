import express from 'express';

export const addApi = async (req: express.Request, res: express.Response) => {
  res.send('addApi Response');
};
export const getApi = async (req: express.Request, res: express.Response) => {
  res.send('getApi Response');
};
