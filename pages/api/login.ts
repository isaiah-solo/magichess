import type {NextApiRequest, NextApiResponse} from 'next';

import {setAuthCookies} from 'next-firebase-auth';

import {initAuth} from '../../utils/initFirebase';

initAuth();

type Data =
  | {
      success: true;
    }
  | {
      error: string;
      success?: false | null;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({
      error: (e as Error).message,
    });
  }

  return res.status(200).json({
    success: true,
  });
}
