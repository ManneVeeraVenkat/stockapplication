import React, { useEffect, useState } from "react";
import { PostCommentResponse } from "../../Entity/PostCommetReponse";
import { GetCommets, PostComments } from "../../Utilis/HttpService";
import { PostCommentRequestBody } from "../../Entity/PostCommentRequest";
import { toast } from "react-toastify";
import { error } from "console";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import StockCommetList from "./StockCommetList/StockCommetList";
import { GetCommentsResponse } from "../../Entity/GetCommentResponse";

type Props = {
  symbol: string;
};
type CommentFormInputs = {
  title: string;
  content: string;
};
const StockCommets = ({ symbol }: Props) => {
  const [comments, setComments] = useState<GetCommentsResponse[] | undefined>(
    []
  );
  const [isloading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    GetStockComments();
  }, [symbol]);
  const handleComment = (e: CommentFormInputs) => {
    const requestBody: PostCommentRequestBody = {
      title: e.title,
      content: e.content,
    };

    PostComments(requestBody, symbol)
      .then((res) => {
        if (res) {
          toast.success("comments created succsfully");
          GetStockComments();
        }
      })
      .catch((error) => {
        toast.warning("failed created comments");
        console.log(error);
      });
  };

  const GetStockComments = () => {
    setIsLoading(true);
    GetCommets(symbol).then((res) => {
      if (res) {
        setComments(res?.successResponse);
        setIsLoading(false);
      }
    });
  };
  return (
    <div>
      <StockCommetList comments={comments!} />
      <StockCommentForm symbol={symbol} handleComment={handleComment} />
    </div>
  );
};

export default StockCommets;
