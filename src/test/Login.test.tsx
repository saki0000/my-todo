import Login from "../features/auth/components/Login";
import { render } from "./test-utils";

test("Loginページのテスト", () => {
  render(<Login />);
});
