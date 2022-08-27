import { fireEvent, render, screen } from "@testing-library/react";
import internalAxiosInstance from "../../constant/internalAxiosInstance";

import RegisterPage from "../../pages/register";
global.alert = jest.fn();
describe("Register Page", () => {
  const mockInternalAxiosInstance = jest.spyOn(internalAxiosInstance, "post");
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders Register  page unchanged", () => {
    const { container } = render(<RegisterPage />);
    expect(container).toMatchSnapshot();
  });
  it("should call register api", () => {
    mockInternalAxiosInstance.mockResolvedValue("mock");
    render(<RegisterPage />);
    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "test99" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "9999" },
    });
    fireEvent.click(screen.getByText("Register"));
  });
  it("should call register api and get rejected", () => {
    mockInternalAxiosInstance.mockResolvedValue("mock");
    render(<RegisterPage />);
    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "test99" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "9999" },
    });
    fireEvent.click(screen.getByText("Register"));
  });
});
