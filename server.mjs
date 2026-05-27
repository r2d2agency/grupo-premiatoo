import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import handler from './dist/server/server.js';
import { Hono } from 'hono';

const app = new Hono();

// Serve static files from dist/client
app.use('/assets/*', serveStatic({ root: './dist/client' }));
app.use('/favicon.ico', serveStatic({ path: './dist/client/favicon.ico' }));

// All other requests go to the TanStack Start handler
app.all('*', async (c) => {
  try {
    return await handler.fetch(c.req.raw);
  } catch (err) {
    console.error('SSR Error:', err);
    return c.text('Internal Server Error', 500);
  }
});

const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
