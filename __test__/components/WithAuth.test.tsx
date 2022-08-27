import { render, waitFor } from "@testing-library/react";

import WithAuth from "../../components/WithAuth";
const mockComponent = jest.fn(() => null);
const Component = WithAuth(mockComponent);
import mockRouter from "../../mock/routerMock";

jest.mock("next/router", () => ({
  useRouter() {
    return mockRouter;
  },
}));
jest.spyOn(require("next/router"), "useRouter");
describe("WithAuth Componant", () => {
  it("redirect authenticate user", async () => {
    render(<Component />);
    waitFor(() => expect(mockComponent).toBeCalled());
    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });
});
