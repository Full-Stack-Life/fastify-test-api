const fastify = require('fastify')({logger: true});

const PORT = 5000

const itemsRoutes = require('./routes/items.routes');

fastify.register(itemsRoutes);

fastify.listen({port: PORT}, (err, addr) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
