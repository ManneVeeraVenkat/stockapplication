import React from "react";
import { GetCommentsResponse } from "../../../Entity/GetCommentResponse";
import { comment } from "postcss";
import CommentListItem from "../StockCommentListItem/CommentListItem";

type Props = {
  comments: GetCommentsResponse[];
};

const StockCommetList = ({ comments }: Props) => {
  return (
    <>
      {comments
        ? comments.map((comment) => {
            return <CommentListItem comment={comment} />;
          })
        : ""}
    </>
  );
};

export default StockCommetList;
