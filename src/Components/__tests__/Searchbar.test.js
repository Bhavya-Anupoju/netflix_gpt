import { render, screen } from "@testing-library/react";
import GptSearchBar from "../GptSearchBar";
import { Provider } from "react-redux";
import appStore from "../../Utils/appStore";

test("Search bar input & Search button", () => {
  render(
    <Provider store={appStore}>
      <GptSearchBar />
    </Provider>
  );
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button"); //or .getByText("Search")[NOT A GOOD WAY]

  expect(inputs).toHaveLength(1);
  expect(button).toBeInTheDocument();
});
