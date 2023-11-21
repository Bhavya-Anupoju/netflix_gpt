import Header from "../Header";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import appStore from "../../Utils/appStore";
import { Provider } from "react-redux";

test("Check Header component has been rendered", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  const Logo = screen.getByAltText("Netflix Logo");
  expect(Logo).toBeInTheDocument();
});
