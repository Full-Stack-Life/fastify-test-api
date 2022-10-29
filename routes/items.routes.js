const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/items.controller");

const Item = {                          // para quando é um array
  type: 'object',
  properties: {                   // para quando é um objeto
    id: { type: 'string' },
    name: { type: 'string' },
  }
};

// Options for get all items
// Para cada rota eu posso definir uma option
// Através das properties eu posso filtrar o retorno
const getItemsOps = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      }
    }
  },
  handler: getItems,
};

const getItemOps = {
  schema: {
    response: {
      200: Item,
    }
  },
  handler: getItem,
};

const postItemOps = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      }
    },
    response: {
      201: Item,
    }
  },
  handler: addItem,
};

const deleteItemOps = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteItem,
};

const updateItemOps = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItem,
};

function itemsRoutes(fastify, ops, done) {
  // using query string
  fastify.get('/', async (req, reply) => {
    const { page, size } = req.query;
    console.log('-------------------------------');
    console.log('page: ' + page);
    console.log('size: ' + size);
    console.log('-------------------------------');
    reply.send(items);
  });

  // Get all items
  fastify.get('/items', getItemsOps);

  // Get single item using params
  fastify.get('/items/:id', getItemOps);

  // Add item
  fastify.post('/items', postItemOps);

  // Delete item
  fastify.delete('/items/:id', deleteItemOps);

  // Update item
  fastify.put('/items/:id', updateItemOps);

  done();
}

module.exports = itemsRoutes;
