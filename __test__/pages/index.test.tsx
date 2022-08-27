import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import internalAxiosInstance from "../../constant/internalAxiosInstance";
import HomePage, { Home } from "../../pages/index";
import "jest-styled-components";
global.alert = jest.fn();

import mockRouter from "../../mock/routerMock";

jest.mock("next/router", () => ({
  useRouter() {
    return mockRouter;
  },
}));
jest.spyOn(require("next/router"), "useRouter");

describe("Home Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders Home  page unchanged", () => {
    waitFor(() =>
      jest.spyOn(internalAxiosInstance, "get").mockResolvedValue({
        totalIncome: "10000",
        totolExpenses: "20000",
      })
    );
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
  it("should fetch summary data successfulty", () => {
    jest.spyOn(internalAxiosInstance, "get").mockResolvedValue({
      id: "mock-id",
      totalExpenses: 10000,
      totalIncome: 20000,
    });
    render(<Home />);
    waitFor(() => {
      expect(screen.getByText("Total Income: 20000")).toBeInTheDocument();
      expect(screen.getByText("Total Expenses: 10000")).toBeInTheDocument();
    });
  });
  it("should submit data and create transaction successful", () => {
    jest.spyOn(internalAxiosInstance, "post").mockResolvedValue({});
    const { getByTestId } = render(<Home />);
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 * 1024 * 3 });

    const upload = getByTestId("upload-button");
    Object.defineProperty(upload, "files", {
      value: [file],
    });

    fireEvent.change(upload);
    fireEvent.input(screen.getByLabelText("Name"), {
      target: { value: "Mock Name" },
    });

    fireEvent.input(screen.getByLabelText("Amount"), {
      target: { value: 1000 },
    });
    fireEvent.click(screen.getByText("income"));
    fireEvent.click(screen.getByText("Record"));
  });
  it("should submit data and creat transaction not successful", () => {
    jest.spyOn(internalAxiosInstance, "post").mockRejectedValue("mock");
    const { getByTestId } = render(<Home />);
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 * 1024 * 3 });
    waitFor(() => {
      expect(screen.getByText("Total Income: 20000")).toBeInTheDocument();
      expect(screen.getByText("Total Expenses: 10000")).toBeInTheDocument();
    });
    const upload = getByTestId("upload-button");
    Object.defineProperty(upload, "files", {
      value: [file],
    });

    fireEvent.change(upload);
    fireEvent.input(screen.getByLabelText("Name"), {
      target: { value: "Mock Name" },
    });

    fireEvent.input(screen.getByLabelText("Amount"), {
      target: { value: 1000 },
    });
    fireEvent.click(screen.getByText("income"));
    fireEvent.click(screen.getByText("Record"));
  });
  it("should have HOC calling", async () => {
    render(<HomePage />);
    waitFor(() => expect(Home).toBeCalled());
  });
});
