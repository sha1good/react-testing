import Login from "./Login";
import {
  findByText,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText(/username/i);
  expect(userInputElement).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement).toBeInTheDocument();
});

test("button shoould be rendered", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText(/username/i);
  expect(userInputElement.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).not.toHaveTextContent(/please wait/i);
});

test("error  should not be visible", () => {
  render(<Login />);
  const errorElement = screen.getByTestId("error");
  expect(errorElement).not.toBeVisible();
});

test("username should change", () => {
  render(<Login />);
  const usernameInputElement = screen.getByPlaceholderText(/username/i);

  const testValue = "test";
  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  expect(usernameInputElement.value).toBe(testValue);
});

test("password should change", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  expect(passwordInputElement.value).toBe(testValue);
});

test("button should not be disabled when user Inputs exist", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  expect(buttonElement).not.toBeDisabled();
});

test("loading should be rendered when clicked", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(buttonElement);

  await waitFor(() =>
    expect(buttonElement).not.toHaveTextContent(/please wait/i)
  );
});

test("Name should be rendered after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(buttonElement);
  const userItem = await screen.findByText("John");
  expect(userItem).toBeInTheDocument();
});
