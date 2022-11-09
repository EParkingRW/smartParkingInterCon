import responses from '../responses';
import 'dotenv/config';

const garage = {
    '/garages': {
        post: {
          tags: ['Garage'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'create new garage',
          parameters: [
            {
                in: 'formData',
                name: 'name',
                required: true,
            },
            {
              in: 'formData',
              name: 'address',
              required: true,
            },
            {
              in: 'formData',
              name: 'latitude',
              required: true,
            },
            {
              in: 'formData',
              name: 'longitude',
              required: true,
            },
            {
              name: 'image',
              in: 'formData',
              required: true,
              type: 'file',
            },
            {
              in: 'formData',
              name: 'companyId',
              required: true,
            },
            {
              in: 'formData',
              name: 'hourlyFee',
              required: true,
            },
            {
              in: 'formData',
              name: 'openingTime',
              required: true,
            },
            {
              in: 'formData',
              name: 'closingTime',
              required: true,
            },
            {
              in: 'formData',
              name: 'description',
              required: true,
            },
            {
              in: 'formData',
              name: 'slots',
              required: true,
            },
            ],
          consumes: ['application/json'],
          responses,
        },
        get: {
          tags: ['Garage'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'retreive all garages',
          parameters: [ ],
          consumes: ['application/json'],
          responses,
        },
      },
      '/garages/{id}': {
        get: {
          tags: ['Garage'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'Get one garage',
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
          tags: ['Garage'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'update garage',
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
     
      ],          consumes: ['application/json'],
          responses,
        },
        delete: {
          tags: ['Garage'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'delete garage',
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
}
export default garage
