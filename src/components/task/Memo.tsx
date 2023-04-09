import { useState } from "react";

const Memo = ({ memo }: { memo: string }) => {
  const [truncate, setTruncate] = useState<boolean>(true);
  if (!memo) return <></>;
  return (
    <div>
      <p
        onClick={() => {
          setTruncate((v) => !v);
        }}
        className={`text-gray-400 m-0 ${truncate && "truncate cursor-pointer"}`}
      >
        {memo}
      </p>
    </div>
  );
};

export default Memo;
