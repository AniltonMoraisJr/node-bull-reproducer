import * as express from 'express';
import { Request, Response } from 'express';
import queues from '../queues';

const router = express.Router();

interface RequestBody {
  message: string;
}

interface CandidateBody {
  partyNumber: number;
  name: string;
  photo: string;
}

interface VoteBody {
  partyNumber: number;
}

interface CustomRequest<T> extends Request {
  body: T;
}

const getPing = async (_req, res) => {
  const body = { message: 'hello' };
  return res.send(body).status(200);
};

const postLog = async (req: CustomRequest<RequestBody>, res: Response) => {
  const body = { message: req.body.message };
  await queues.log.add(body);
  return res.send(body).status(200);
};

const postEmail = async (req: CustomRequest<RequestBody>, res: Response) => {
  const body = { message: req.body.message };
  await queues.email.add(body);
  return res.send(body).status(200);
};

const postCandidate = async (
  req: CustomRequest<CandidateBody>,
  res: Response,
) => {
  const body = req.body;
  await queues.candidate.add(body);
  return res.send(body).status(200);
};

const postVote = async (req: CustomRequest<VoteBody>, res: Response) => {
  const body = req.body;
  await queues.vote.add(body);
  return res.send(body).status(200);
};

router.get('/', getPing);
router.post('/log', postLog);
router.post('/email', postEmail);
router.post('/candidates', postCandidate);
router.post('/votes', postVote);

export default router;
