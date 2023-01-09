import responses from '../responses';
import 'dotenv/config';

const user = {
    '/users': {
        get: {
          tags: ['Users'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'retreive all users',
          parameters: [ ],
          consumes: ['application/json'],
          responses,
        },
      },
      '/users/{id}': {
        get: {
          tags: ['Users'],
          security: [
            {
              JWT: [],
            },
          ],
        summary: 'Get one user',
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
          tags: ['Users'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'update user',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
            },
            {
              in: 'body',
              name: 'user',
              schema: {
                example:{
                  fullName: 'Ndatumuremyi Paterne',
                  userName:'Thunderzeye',
                  email: 'ndatumuremyip@gmail.com',
                  phoneNumber:'+250788888888',
                  gender:'Male',
                  dateOfBirth:'12/12/2007',
                  password: 'admin123!',
                  company:'Imanzi ltd',
                }
              },
            },
            ],
          consumes: ['application/json'],
          responses,
        },
        delete: {
          tags: ['Users'],
          security: [
            {
              JWT: [],
            },
          ],
          summary: 'delete user',
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
export default user
