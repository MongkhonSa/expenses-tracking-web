import { render } from "@testing-library/react";
import SummaryTable from "../../components/SummaryTable";

describe("Summary Table Componant", () => {
  it("renders no data", () => {
    const { container } = render(<SummaryTable dataSource={[]} />);
    expect(container).toMatchSnapshot();
  });
  it("renders with data", () => {
    const mockDataSource = [
      {
        categoryName: "categoryName1",
        total: "100",
      },
      {
        categoryName: "categoryName2",
        total: "200",
      },
    ];
    const { container } = render(<SummaryTable dataSource={mockDataSource} />);
    expect(container).toMatchSnapshot();
  });
});
