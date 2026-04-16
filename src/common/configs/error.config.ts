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

  INTERNAL_ERROR: {
    status: 'error',
    message: 'Something went wrong',
  },
} as const satisfies ErrorConfigType;
