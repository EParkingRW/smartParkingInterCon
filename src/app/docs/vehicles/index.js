import responses from '../responses';
import 'dotenv/config';

const Vehicles = {
    '/vehicles': {
        post: {
          tags: ['Vehicles'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'create new object',
          parameters: [
            {
                in: 'formData',
                name: 'plateText',
                required: true,
            },
            {
              name: 'photo',
              in: 'formData',
              required: true,
              type: 'file',
            },
            {
              name: 'garageId',
              in: 'formData',
              required: true,
            },
          ],
          consumes: ['application/json'],
          responses,
        },
        get: {
          tags: ['Vehicles'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'retreive all vehicles',
          parameters: [],
          consumes: ['application/json'],
          responses,
        },
      },
    '/vehicles/{id}': {
      delete: {
        tags: ['Vehicles'],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'delete Vehicles',
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
    '/vehicles/range': {
      post: {
        tags: ['Vehicles'],
        security: [ {JWT: [],},
        ],
        summary: 'retreive all vehicles in certain date range',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              example: {
                startingDate:"1/1/2021",
                endingDate:"12/12/2022"
              },
            },
          },
        ],
        consumes: ['application/json'],
        responses,
      },
    },
}
export default Vehicles
