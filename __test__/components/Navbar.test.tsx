import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import mockRouter from "../../mock/routerMock";

jest.mock("next/router", () => ({
  useRouter() {
    return mockRouter;
  },
}));
jest.spyOn(require("next/router"), "useRouter");

describe("Navbar", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Navbar unchanged", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
  it("should reset local storage when logout", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText("logout"));
    expect(localStorage.clear).toBeCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });
});
