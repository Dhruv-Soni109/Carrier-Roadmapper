import crypto from 'crypto';

export const requestIdMiddleware = (req, res, next) => {
  const incomingId = req.headers['x-request-id'];
  const requestId = (incomingId && typeof incomingId === 'string' && incomingId.length < 100)
    ? incomingId
    : `pf_${crypto.randomUUID().slice(0, 12)}`;

  req.id = requestId;
  res.locals = res.locals || {};
  res.locals.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
};
