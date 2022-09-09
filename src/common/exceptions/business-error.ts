import ErrorResponse from '../types/error-response';

class BusinessError extends Error {
  private msg: string;

  constructor(message: string, private errName = '', private error = {}) {
    super(message);

    this.msg = message;

    Object.setPrototypeOf(this, BusinessError.prototype);
  }

  getError(): ErrorResponse {
    return { name: this.errName, message: this.msg, error: this.error };
  }
}

export default BusinessError;
