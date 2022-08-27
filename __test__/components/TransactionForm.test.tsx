import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import TransactionForm from "../../components/TransactionForm";
import "jest-styled-components";
import externalAxiosInstance from "../../constant/externalAxiosInstance";
global.alert = jest.fn();
describe("Transaction Componant", () => {
  const mockPostAios = jest.spyOn(externalAxiosInstance, "post");
  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  const mockOnSubmit = () => jest.fn();
  afterEach(() => jest.clearAllMocks);
  it("renders Transaction unchanged", () => {
    const { container } = render(<TransactionForm onSubmit={mockOnSubmit} />);
    expect(container).toMatchSnapshot();
  });
  it("should handle upload file more than 5MB", async () => {
    const { getByTestId } = render(<TransactionForm onSubmit={mockOnSubmit} />);

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 * 1024 * 7 });

    const upload = getByTestId("upload-button");
    Object.defineProperty(upload, "files", {
      value: [file],
    });

    fireEvent.change(upload);
    expect(alert).toHaveBeenCalledWith("Image must smaller than 5MB!");
  });
  it("should handle upload file and remove file", async () => {
    const { getByTestId } = render(<TransactionForm onSubmit={mockOnSubmit} />);

    Object.defineProperty(file, "size", { value: 1024 * 1024 * 3 });

    const upload = getByTestId("upload-button");
    Object.defineProperty(upload, "files", {
      value: [file],
    });
    fireEvent.change(upload);
    expect(alert).toHaveBeenCalledWith("Image must smaller than 5MB!");
    waitFor(() => fireEvent.click(screen.getByTitle("Remove file")));
  });
  it("should handle upload file and upload to axios error", async () => {
    mockPostAios.mockRejectedValue("mock");
    const { getByTestId } = render(<TransactionForm onSubmit={mockOnSubmit} />);

    Object.defineProperty(file, "size", { value: 1024 * 1024 * 3 });

    const upload = getByTestId("upload-button");
    Object.defineProperty(upload, "files", {
      value: [file],
    });
    fireEvent.change(upload);
  });
  it("should handle upload file and upload to axios successully", async () => {
    mockPostAios.mockResolvedValue("mock");
    const { getByTestId } = render(<TransactionForm onSubmit={mockOnSubmit} />);

    Object.defineProperty(file, "size", { value: 1024 * 1024 * 3 });

    const upload = getByTestId("upload-button");
    Object.defineProperty(upload, "files", {
      value: [file],
    });
    fireEvent.change(upload);
  });
  it("should fill the transaction form and submit successully", async () => {
    mockPostAios.mockResolvedValue("mock");

    const { getByTestId } = render(<TransactionForm onSubmit={mockOnSubmit} />);

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
});
