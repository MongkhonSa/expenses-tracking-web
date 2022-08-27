import { render } from "@testing-library/react";
import Login from "../../components/Login";

describe("Login Componant", () => {
  it("renders Login unchanged", () => {
    const { container } = render(<Login onSubmit={() => jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
  it("show register button", () => {
    const { container } = render(
      <Login onSubmit={() => jest.fn()} isRegister />
    );
    expect(container).toMatchSnapshot();
  });
});
