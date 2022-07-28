import ErrorResponse from '../types/error-response';

class BusinessError extends Error {
  private msg: string;

  constructor(message: string, private errName = '', private code = '') {
    super(message);

    this.msg = message;

    Object.setPrototypeOf(this, BusinessError.prototype);
  }

  getError(): ErrorResponse {
    return { name: this.errName, message: this.msg, code: this.code };
  }
}

export default BusinessError;
