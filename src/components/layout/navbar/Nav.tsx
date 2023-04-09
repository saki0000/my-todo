import { AiOutlineForm, AiOutlineSchedule } from "react-icons/ai";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex flex-col space-y-4 mt-16">
      <Link to="/" className="no-underline text-white">
        <div className="relative flex space-x-2 justify-center">
          <div className="pt-1">
            <AiOutlineForm color="" size={26} />
          </div>
          <div>
            <p
              className={` m-0 font-bold  text-2xl   ${
                location.pathname == "/" && "underline"
              } hover:underline decoration-white cursor-pointer
              `}
            >
              Inbox
            </p>
          </div>

          {/* <InboxNumber /> */}
        </div>
      </Link>
      <Link to="/tasks" className="no-underline text-white">
        <div className="flex space-x-2 justify-center">
          <div className="pt-1">
            <AiOutlineSchedule color="" size={26} />
          </div>
          <p
            className={`m-0 font-bold  text-2xl   ${
              location.pathname == "/tasks" && "underline"
            } hover:underline decoration-white cursor-pointer`}
          >
            Tasks
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Nav;
