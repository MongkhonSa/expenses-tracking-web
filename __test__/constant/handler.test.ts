import { AxiosError, AxiosResponse } from "axios";
import {
  errorHandler,
  internalErrorHandler,
  resHandler,
} from "../../constant/handler";
describe("test handler", () => {
  beforeAll(() => jest.fn().mockReset());
  it("should handle axios correctly", () => {
    const mockRes = {
      data: {
        mydata: "mockmoc",
      },
    } as AxiosResponse;

    expect(resHandler(mockRes)).toEqual(mockRes.data);
  });
  it("should handle axios error correctly", async () => {
    const mockError = {
      message: "test",
    } as AxiosError;

    expect(() => errorHandler(mockError)).toThrowError("");
  });
  it("should handle internal error handler axios correctly", () => {
    const mockRequest = {
      response: {
        status: 401,
      },
      message: "unauthorize",
    } as AxiosError;

    expect(internalErrorHandler(mockRequest)).rejects.toEqual(mockRequest);
  });
});
