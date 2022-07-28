type ErrorResponse = {
  /**
   * The name that identifies the type of exception that has occured.
   */
  name: string;
  /**
   * The message that determines in a more verbose way what happened.
   */
  message: string;
  /**
   * An internal code that allows to track the exception by identified codes within the organization
   */
  code: string;
};

export default ErrorResponse;
