import { renderHook, act } from "react-hooks-testing-library";
import { useMovies } from "./hooks/useMovies";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import "jest-dom/extend-expect";

afterEach(cleanup);

test("loads and displays greeting", async () => {
  const { result } = renderHook(() => useMovies());
  const query = "Harry potter";
  act(() => result.current.fetchMovies(query));
  await wait(() => fetchMovies(query));

  const url = "/greeting";
  const { getByText, getByTestId } = render(<Fetch url={url} />);

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: "hello there" }
  });

  fireEvent.click(getByText("Load Greeting"));

  const greetingTextNode = await waitForElement(() =>
    getByTestId("greeting-text")
  );

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
  expect(getByTestId("greeting-text")).toHaveTextContent("hello there");
  expect(getByTestId("ok-button")).toHaveAttribute("disabled");
});

test("should start fetching movies", () => {
  const { result } = renderHook(() => useMovies());
  const query = "Harry potter";
  act(() => result.current.fetchMovies(query));
  expect(result.current.state.isFetching).toBe(true);
});
