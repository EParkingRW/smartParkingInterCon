import responses from '../responses';

const company = {
  '/companies': {
    post: {
      tags: ['Company'],
      security: [],
      summary: 'Create company',
      parameters: [
        {
          in: 'body',
          name: 'company',
          required: true,
          schema: {
            example: {
              name: 'Emmaneul NKUBITO',
              garageId:'',
              ownerId: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['Company'],
      security: [],
      summary: 'Get all companies',
      parameters: [],
      consumes: ['application/json'],
      responses,
    },
  },
  '/companies/{id}': {
    get: {
      tags: ['Company'],
      security: [],
      summary: 'Get one company',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    put: {
      tags: ['Company'],
      security: [],
      summary: 'Edit company profile',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
          },
        },
        {
          in: 'body',
          name: 'company',
          schema: {
            example: {
              name: 'Emmaneul NKUBITO',
              garageId:'',
              ownerId: '',
            },
          },
        },
     
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      tags: ['Company'],
      security: [],
      summary: 'Delete company',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default company;
