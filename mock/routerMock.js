const mockRouter = {
  route: "/",
  pathname: "",
  query: "",
  asPath: "",
  isReady: true,
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
};

export default mockRouter;
