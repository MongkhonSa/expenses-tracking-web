import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import internalAxiosInstance from "../../constant/internalAxiosInstance";

import ReportPage from "../../pages/report";
global.alert = jest.fn();
describe("Report Page", () => {
  const mockInternalAxiosInstance = jest.spyOn(internalAxiosInstance, "post");
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders report page unchanged", () => {
    const { container, getByTestId } = render(<ReportPage />);
    mockInternalAxiosInstance.mockResolvedValue([
      { categoryName: "mockCategoryName1", total: 100 },
      { categoryName: "mockCategoryName2", total: 100 },
      { categoryName: "mockCategoryName3", total: 100 },
      { categoryName: "mockCategoryName4", total: 100 },
    ]);
    expect(container).toMatchSnapshot();
  });
  it("should call register api", async () => {
    mockInternalAxiosInstance.mockResolvedValue([
      { categoryName: "mockCategoryName", total: 100 },
    ]);

    const { getByTestId } = render(<ReportPage />);
    waitFor(() => {
      expect(screen.getByText("mockCategoryName")).toBeInTheDocument();
    });
    waitFor(() => {
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "daily" },
      });
    });
    const dateInput = getByTestId("date-pick-test");
    fireEvent.mouseDown(dateInput);
    fireEvent.change(dateInput, { target: { value: "2022-08-27" } });
    fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0]);
    fireEvent.click(screen.getByText("expenses"));
  });
  it("should call register api and got error", async () => {
    mockInternalAxiosInstance.mockRejectedValue("mock");

    const { getByTestId } = render(<ReportPage />);
    waitFor(() => {
      expect(screen.getByText("mockCategoryName")).toBeInTheDocument();
    });
    waitFor(() => {
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "daily" },
      });
    });
    const dateInput = getByTestId("date-pick-test");
    fireEvent.mouseDown(dateInput);
    fireEvent.change(dateInput, { target: { value: "2022-08-27" } });
    fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0]);
    fireEvent.click(screen.getByText("expenses"));
  });
});
