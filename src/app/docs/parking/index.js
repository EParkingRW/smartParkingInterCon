import responses from '../responses';
import 'dotenv/config';

const parking = {
    '/garages': {
        post: {
          tags: ['Parkings'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'create new parking',
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
          tags: ['Parkings'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'retreive all parkings',
          parameters: [ ],
          consumes: ['application/json'],
          responses,
        },
    },
    '/garages/{id}': {
        get: {
          tags: ['Parkings'],
          security: [
            {
              JWT: [],
            },
          ],
        summary: 'Get one parking',
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
          tags: ['Parkings'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'update parking',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
              },
            },
            {
              in: 'formData',
              name: 'name',
            },
            {
              in: 'formData',
              name: 'address',
            },
            {
              in: 'formData',
              name: 'latitude',
            },
            {
              in: 'formData',
              name: 'longitude',
            },
            {
              name: 'image',
              in: 'formData',
              type: 'file',
            },
            {
              in: 'formData',
              name: 'hourlyFee',
            },
            {
              in: 'formData',
              name: 'openingTime',
            },
            {
              in: 'formData',
              name: 'closingTime',
            },
            {
              in: 'formData',
              name: 'description',
            },
            {
              in: 'formData',
              name: 'slots',
            },
            ],
          consumes: ['application/json'],
          responses,
        },
        delete: {
          tags: ['Parkings'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'delete parking',
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
    '/garages/user': {
      get: {
        tags: ['Parkings'],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'retreive all parkings registered to logged in user',
        parameters: [ ],
        consumes: ['application/json'],
        responses,
      },
    },
}
export default parking
