import { Request, Response, NextFunction } from "express";

function enableCORS(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Fingerprint, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
}



export function onlyAllowCorsInMyClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const allowedOrigins = [process.env.FRONTEND_URL as string];

  if (allowedOrigins.includes(req.headers.origin as string)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, OPTIONS, POST, PUT, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  } else {
    res.sendStatus(403);
  }
}

export default enableCORS;
