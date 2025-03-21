import axios from "axios";
import { APIFailureResponse } from "../Entity/APIFailureResponse";
import { APIResponse } from "../Entity/APIResponse";
import { LoginResponse } from "../Entity/LoginRespinse";
import { APICONFIG } from "./ApiConfig";
import { title } from "process";
import { PostCommentResponse } from "../Entity/PostCommetReponse";
import { PostCommentRequestBody } from "../Entity/PostCommentRequest";
import { GetCommentsResponse } from "../Entity/GetCommentResponse";
import { PortfolioResponse } from "../Entity/PortfolioResponse";
import { HandleErrorResponse } from "../Entity/HandleErrorResponse";

const api = "https://localhost:7174/api/";

export const LoginUser = async (
  userName: string,
  password: string
): Promise<APIResponse<LoginResponse, APIFailureResponse>> => {
  let response: APIResponse<LoginResponse, APIFailureResponse> = {};

  try {
    const apiResponse = await axios.post<LoginResponse>(
      api + APICONFIG.Login_endpoint,
      { username: userName, password: password }
    );

    response = apiResponse;
  } catch (error) {
    console.log(error);
  }

  return response;
};

export const RegisterUser = async (
  email: string,
  userName: string,
  password: string
): Promise<APIResponse<LoginResponse, APIFailureResponse>> => {
  let response: APIResponse<LoginResponse, APIFailureResponse> = {};

  try {
    const apiResponse = await axios.post<LoginResponse>(
      api + APICONFIG.Register_endpoint,
      { email: email, username: userName, password: password }
    );

    response = apiResponse;
  } catch (error) {
    console.log(error);
  }

  return response;
};

export const PostComments = async (
  CommentRequestBody: PostCommentRequestBody,
  symbol: string
): Promise<APIResponse<PostCommentResponse, APIFailureResponse>> => {
  let response: APIResponse<PostCommentResponse, APIFailureResponse> = {};
  try {
    const apiResponse = await axios.post<PostCommentResponse>(
      api + APICONFIG.Post_Comments_endPpoint.replace("{0}", symbol),
      CommentRequestBody
    );
    response = apiResponse;
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const GetCommets = async (
  symbol: string
): Promise<APIResponse<GetCommentsResponse[], APIFailureResponse>> => {
  let response: APIResponse<GetCommentsResponse[], APIFailureResponse> = {};
  try {
    const apiResponse = await axios.get<GetCommentsResponse[]>(
      api + APICONFIG.Get_Comments_endPpoint.replace("{0}", symbol)
    );
    response = apiResponse;
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const PostPortfolio = async (
  symbol: string
): Promise<APIResponse<PortfolioResponse, APIFailureResponse>> => {
  let response: APIResponse<PortfolioResponse, APIFailureResponse> = {};
  try {
    const apiResponse = await axios.post<PortfolioResponse>(
      api + APICONFIG.Post_Portfolio.replace("{0}", symbol)
    );
    response = apiResponse;
  } catch (error) {
    response = HandleErrorResponse<PortfolioResponse, APIFailureResponse>(
      error
    );
  } finally {
    return response;
  }
};

export const GetPortfolioDeatiles = async (): Promise<
  APIResponse<PortfolioResponse[], APIFailureResponse>
> => {
  let response: APIResponse<PortfolioResponse[], APIFailureResponse> = {};
  try {
    const apiResponse = await axios.get<PortfolioResponse[]>(
      api + APICONFIG.Get_Portfolio
    );
    response = apiResponse;
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const DeletePortfolio = async (
  symbol: string
): Promise<APIResponse<PortfolioResponse, APIFailureResponse>> => {
  let response: APIResponse<PortfolioResponse, APIFailureResponse> = {};
  try {
    const apiResponse = await axios.delete<PortfolioResponse>(
      api + APICONFIG.Post_Portfolio.replace("{0}", symbol)
    );
    response = apiResponse;
  } catch (error) {
    console.log(error);
  }
  return response;
};
