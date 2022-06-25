import LogQueue from './log.queue';

const queues = {
  log: LogQueue.getInstance().queue,
};

export default queues;
