type ErrorConfigType = {
  [key: string]: {
    status: 'fail' | 'error';
    message: string;
  };
};

// For customizing the errors
export const ERROR_CONFIG = {
  VALIDATION_ERROR: {
    status: 'fail',
    message: 'Validation failed',
  },

  AUTHENTICATION_ERROR: {
    status: 'fail',
    message: 'Email or password is incorrect',
  },

  INTERNAL_ERROR: {
    status: 'error',
    message: 'Something went wrong',
  },
} as const satisfies ErrorConfigType;
