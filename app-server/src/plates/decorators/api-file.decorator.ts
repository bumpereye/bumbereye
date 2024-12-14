import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (
  description = 'The file to be uploaded',
): MethodDecorator => {
  return ApiBody({
    description,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  });
};
