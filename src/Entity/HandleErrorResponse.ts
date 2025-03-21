import { isUndefined } from "util";
import { APIResponse } from "./APIResponse";

export const HandleErrorResponse = <R, S>(
  error: any,
  errorMessage?: string
): APIResponse<R, S> => {
  const errorResponse: APIResponse<R, S> = {};
  if (error.response == undefined || error.response == null) {
    errorResponse.message = error.message;
    errorResponse.status = 400;
    return errorResponse;
  }
  switch (error.response.status as number) {
    case 400:
    case 401:
    case 403:
      errorResponse.status = error.response.status;
      errorResponse.statusText = error.response.statusText;
      errorResponse.failureResponse = error.response.data as S;
      break;
    default:
      errorResponse.status = 500;
      errorResponse.statusText = "Api failure";
      errorResponse.message = {
        content: `${errorMessage}`,
        type: 2,
      };
      break;
  }
  return errorResponse;
};
