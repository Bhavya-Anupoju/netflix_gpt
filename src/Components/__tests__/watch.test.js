import { render, screen } from "@testing-library/react";
import Watch from "../Watch";
import { BrowserRouter } from "react-router-dom";
import appStore from "../../Utils/appStore";
import { Provider } from "react-redux";

test("Video component renders correctly", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Watch />
      </BrowserRouter>
    </Provider>
  );
  const videoBackgroundElement = screen.getByTestId("video-background-iframe");
  expect(videoBackgroundElement).toBeInTheDocument();
});
