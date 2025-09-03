import { formatDistanceToNow } from "date-fns";

export default function CommentTime({ timestamp }) {
    return (
        <span>
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
    );
};