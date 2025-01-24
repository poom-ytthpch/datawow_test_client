import { fromNowFormat } from "@/app/common/date";
import { Comment } from "@/types";
import Image from "next/image";
type Props = {
  comment: Comment;
};
const CommentCard = ({ comment }: Props) => {
  return (
    <div className="mt-4">
      <div className="flex items-center ">
        <Image
          src={comment?.author?.image || ""}
          width={40}
          height={40}
          alt="board logo"
        />
        <p className="text-black ml-2">{comment?.author?.username}</p>
        <p className="text-[#939494] text-xs ml-2">
          {fromNowFormat(comment?.createdAt)}
        </p>
      </div>

      <div className="ml-14 mt-4">
        <p className="text-black text-sm">{comment?.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
