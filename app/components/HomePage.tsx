"use client";
import React, { useEffect, useState } from "react";
import {
  useGetPokemonByTypeQuery,
  useGetPokemonListQuery,
} from "../services/api";
import Pagination from "@mui/material/Pagination";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import ViewLayout from "./ViewLayout";
import ScrollToTop from "./ScrollTop";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });

const HomePage = () => {
  const [view, setView] = useState<"module" | "list">("module");
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 20;
  const selectedType = useSelector(
    (state: RootState) => state.type.selectedType
  );
  const isAll = selectedType === "All";

  useEffect(() => {
    if (!selectedType) return;
    setPage(1);
    setOffset(0);
  }, [selectedType]);

  const {
    data: paginatedData,
    error,
    isLoading,
  } = useGetPokemonListQuery(
    {
      offset,
      limit,
    },
    { skip: !isAll, refetchOnMountOrArgChange: true }
  );
  const {
    data: typeData,
    error: typeErrors,
    isLoading: isTypeLoading,
  } = useGetPokemonByTypeQuery(selectedType, { skip: isAll });

  if (isLoading) return <Loader />;
  if (error || typeErrors) return <p>Error while loading pokemons.</p>;

  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    nextView: "module" | "list"
  ) => {
    if (nextView !== null) setView(nextView);
  };

  const pokemons =
    selectedType === "All"
      ? paginatedData?.results
      : typeData?.pokemon.map((p) => p.pokemon);

  return (
    <div>
      <div className="flex flex-row max-md:flex-col p-4 gap-x-8">
        <div className="w-1/4 my-3 max-md:w-full">
          <Sidebar />
        </div>
        <div className="w-3/4  max-md:w-full">
          <div className="flex justify-between my-3">
            <h3 className="text-xl">Pokemon List</h3>
            <div className="flex justify-end">
              <ToggleButtonGroup value={view} exclusive onChange={handleView}>
                <ToggleButton value="list" aria-label="list">
                  <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="module" aria-label="module">
                  <ViewModuleIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <ViewLayout
            pokemons={pokemons}
            view={view}
            isLoading={isTypeLoading}
          />
          {isAll && (
            <Pagination
              count={10}
              color="primary"
              page={page}
              onChange={(_, newPage) => {
                setPage(newPage);
                setOffset(limit * (newPage - 1));
                window.scrollTo({ behavior: "smooth", top: 0 });
              }}
              className="flex mt-20 justify-center"
            />
          )}
          <ScrollToTop />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
