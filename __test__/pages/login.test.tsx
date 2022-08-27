import { fireEvent, render, screen } from "@testing-library/react";
import internalAxiosInstance from "../../constant/internalAxiosInstance";
import LoginPage from "../../pages/login";
global.alert = jest.fn();
describe("Login Page", () => {
  const mockInternalAxiosInstance = jest.spyOn(internalAxiosInstance, "post");
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders Login  page unchanged", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
  it("should call login api", () => {
    mockInternalAxiosInstance.mockResolvedValue("mock");
    render(<LoginPage />);
    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "test99" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "9999" },
    });
    fireEvent.click(screen.getByText("Login"));
  });
});
