import { ApiBody } from '@nestjs/swagger';

export const ApiLoginBody = (): MethodDecorator => {
  return ApiBody({
    description: 'Credentials for login',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  });
};
