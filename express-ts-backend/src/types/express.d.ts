import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    // ensures params typing doesn't degrade; actual types are extended in per-route d.ts if needed
  }
}

