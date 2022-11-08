import responses from '../responses';

const users = {
  '/auth': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'Register as User to Parking Interconnect',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              fullName: 'Emmaneul NKUBITO',
              userName:'Thunderzeye',
              email: 'emmanuelnkubito2@gmail.com',
              phoneNumber:'+250788888888',
              gender:'Male',
              dateOfBirth:'12/12/2007',
              password: 'admin123!',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/signin': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'Signin to Parking Interconnect',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              email: 'emmanuelnkubito2@gmail.com',
              password: 'admin123!',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/confirm': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'Confirm email',
      parameters: [
        {
          in: 'body',
          name: 'token',
          required: true,
          schema: {
            example: {
              token: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/profile': {
    get: {
      tags: ['Users'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'Get my profile',
      parameters: [],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/forget-password': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'forget password',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              email: 'emmanuelnkubito2@gmail.com',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/reset-password': {
    put: {
      tags: ['Users'],
      security: [],
      summary: 'reset password',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              password: 'admin123!!',
              token: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/logout': {
    post: {
      tags: ['Users'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'Logout',
      parameters: [],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default users;
