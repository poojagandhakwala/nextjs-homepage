import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HomePage from "../app/components/HomePage";
import { Provider } from "react-redux";
import { store } from "../app/store/store";
import * as api from "../app/services/api";
import { TextEncoder } from "node:util";

global.TextEncoder = TextEncoder;
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock the API hooks
jest.mock("../app/services/api", () => ({
  ...jest.requireActual("../app/services/api"),
  useGetPokemonListQuery: jest.fn(),
  useGetPokemonByTypeQuery: jest.fn(),
}));

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: false,
    });

    (api.useGetPokemonByTypeQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: false,
    });
  });

  it("should render loading state initially", () => {
    (api.useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderWithProviders(<HomePage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument(); 
  });

  it("should render error state", async () => {
    (api.useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    renderWithProviders(<HomePage />);
    expect(screen.getByText(/error while loading pokemons\./i)).toBeInTheDocument();
  });

  it("should render list of Pokémon when data is fetched", () => {
    (api.useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      },
      isLoading: false,
      error: false,
    });

    renderWithProviders(<HomePage />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("ivysaur")).toBeInTheDocument();
  });

  it("should switch view when toggle is clicked", () => {
    (api.useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
      },
      isLoading: false,
      error: false,
    });

    renderWithProviders(<HomePage />);
    const listToggle = screen.getByLabelText("list");
    fireEvent.click(listToggle);
    expect(listToggle).toHaveAttribute("aria-pressed", "true");
  });
});
