import { useRecoilValue } from "recoil";
import { inboxNumber } from "../../../atoms/inboxNumberAtom";

const InboxNumber = () => {
  const inbox = useRecoilValue(inboxNumber);
  return (
    <div>
      {inbox !== 0 && inbox && (
        <div className="bg-brown h-6 w-6  rounded-full text-center absolute top-0 left-16">
          <p className="text-white m-0 font-semibold">{inbox}</p>
        </div>
      )}
    </div>
  );
};

export default InboxNumber;
