/**
 * Wrapper interface for API response data
 */
export interface APIResponse<T, U> {
  /**
   * HTTP response status code
   */
  status?: number;

  /**
   * HTTP response status text
   */
  statusText?: string;

  /**
   * API Response Message
   */
  message?: APIResponseMessage;

  /**
   * Success Response Data
   */
  successResponse?: T;

  /**
   * Failure Response Data
   */
  failureResponse?: U;
}

/**
 * API Response Message
 */
export interface APIResponseMessage {
  /**
   * Message content
   */
  content: string;

  /**
   * Message Type
   */
  type: APIResponseMessageType;
}

/**
 * @name APIResponseMessageType
 * @description enum for API Response Message types
 */
enum APIResponseMessageType {
    /**
     * Information message
     */
    info,
    /**
     * Warning message
     */
    warning,
    /**
     * Error Message
     */
    error,
    /**
     * Success Message
     */
    success
  }