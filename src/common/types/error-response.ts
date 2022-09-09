type ErrorResponse = {
  /**
   * The name that identifies the type of exception that has occured.
   */
  name: string;
  /**
   * The message that determines in a more verbose way what happened.
   */
  message: string;

  error: any;
};

export default ErrorResponse;
