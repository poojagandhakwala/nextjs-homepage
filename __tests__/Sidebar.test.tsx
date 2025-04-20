import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "../app/components/Sidebar";
import { Provider, useSelector } from "react-redux";
import { store } from "../app/store/store";
import * as api from "../app/services/api";
import { TextEncoder } from "node:util";
global.TextEncoder = TextEncoder;
import "@testing-library/jest-dom";
import { setSelectedType } from "../app/store/features/typeSlice";

//Mock redux hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockStore = {
  getState: () => ({}),
  subscribe: jest.fn(),
  dispatch: mockDispatch,
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
  useStore: () => mockStore,
}));


// Mock API hooks
jest.mock("../app/services/api", () => ({
  ...jest.requireActual("../app/services/api"),
  useGetPokemonTypesQuery: jest.fn(),
}));

const renderWithProviders = () =>
  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading skeletons when loading", () => {
    (api.useGetPokemonTypesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: false,
    });

    renderWithProviders();
    expect(screen.getAllByTestId("skeleton-chip").length).toBeGreaterThan(0);
  });

  it("should show error message if error occurs", () => {
    (api.useGetPokemonTypesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    renderWithProviders();
    expect(
      screen.getByText(/No Types found\.Please try again\./i)
    ).toBeInTheDocument();
  });

  it("should render Pokémon types when data is available", () => {
    (api.useGetPokemonTypesQuery as jest.Mock).mockReturnValue({
      data: {
        results: [{ name: "fire" }, { name: "water" }, { name: "grass" }],
      },
      isLoading: false,
      error: false,
    });

    renderWithProviders();

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
    expect(screen.getByText("grass")).toBeInTheDocument();
  });

  it("should dispatch action on chip click",  () => {
    (api.useGetPokemonTypesQuery as jest.Mock).mockReturnValue({
      data: {
        results: [{ name: "fire" }],
      },
      isLoading: false,
      error: false,
    });
    
    renderWithProviders();

    const chip = screen.getByTestId("type-chip-fire");
    const chipLabel = screen.getByText("fire");
    const chipContainer = chipLabel.closest("div");
    fireEvent.click(chip);

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedType("fire"));
  });
});
