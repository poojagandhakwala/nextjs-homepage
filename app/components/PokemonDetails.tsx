"use client";
import React from "react";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import { useGetPokemonByIdQuery } from "../services/api";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { Ability, Moves, Types } from "../services/types";
import Image from "next/image";

const PokemonDetails = () => {
  const { id } = useParams();
  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonByIdQuery(Number(id));

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading pokemon details</p>;

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          No pokemon found. Please try again later!
        </Typography>
      </div>
    );
  }

  const {
    name,
    height,
    weight,
    base_experience,
    abilities,
    types,
    moves,
    sprites,
    cries,
  } = pokemon;

  const images = [
    sprites?.front_default,
    sprites?.front_female,
    sprites?.front_shiny,
    sprites?.front_shiny_female,
    sprites?.back_default,
    sprites?.back_female,
    sprites?.back_shiny,
    sprites?.back_shiny_female,
  ].filter((image) => image);

  return (
    <div className="p-4">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Typography color="text.primary" className="capitalize">
          {name}
        </Typography>
      </Breadcrumbs>
      <div className="p-5">
        <div className="flex flex-row max-lg:flex-col gap-x-4">
          <div className="w-1/3 p-2 max-lg:w-full">
            <ImageList
              sx={{
                width: "100%",
                maxWidth: 500,
                maxHeight: "none",
                overflow: "visible",
              }}
              cols={images.length > 4 ? 3 : 2}
              gap={16}
            >
              {images.map(
                (item) =>
                  item && (
                    <ImageListItem key={item}>
                      {/* <img
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={item}
                        alt={item}
                        loading="lazy"
                        className="bg-gray-100 rounded-md shadow-md"
                      /> */}
                      <Image
                        src={item}
                        alt={item}
                        width={164}
                        height={164}
                        className="bg-gray-100 rounded-md shadow-md object-contain"
                        style={{ width: "100%", height: "auto" }}
                        loading="lazy"
                      />
                    </ImageListItem>
                  )
              )}
            </ImageList>
          </div>
          <div className="w-2/3  max-lg:w-full">
            <div className="flex flex-col flex-wrap gap-4 mb-6">
              <Typography variant="h4" className="capitalize font-bold">
                {name}
              </Typography>
              <div className="flex gap-2 flex-wrap">
                {types.map((t: Types) => (
                  <Chip
                    key={t.type.name}
                    label={t.type.name}
                    className="capitalize text-white"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </div>
            </div>
            <Divider className="my-6" />
            <Typography variant="h6" className="mb-2">
              Base Stats
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Height:</strong> {height / 10} m
              </div>
              <div>
                <strong>Weight:</strong> {weight / 10} kg
              </div>
              <div>
                <strong>Base Exp:</strong> {base_experience}
              </div>
            </div>
            {cries?.latest && (
              <div className="my-4">
                <Typography variant="subtitle1" className="mb-1 !text-gray-700">
                  Pokémon Cry
                </Typography>
                <audio controls className="max-w-72 max-lg:max-w-60">
                  <source src={cries.latest} type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            <Table className="bg-white rounded-md shadow-sm max-w-full sm:max-w-md">
              <TableHead>
                <TableRow>
                  <TableCell className="!font-bold">Ability</TableCell>
                  <TableCell className="!font-bold" align="center">
                    Hidden?
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {abilities.map((ab: Ability) => (
                  <TableRow key={ab.ability.name}>
                    <TableCell className="capitalize">
                      {ab.ability.name}
                    </TableCell>
                    <TableCell align="center">
                      {ab.is_hidden ? "✅" : "❌"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <Accordion variant="outlined" defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Moves ({moves.length})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-wrap gap-2">
              {moves.map((m: Moves, index: number) => (
                <Chip key={index} label={m.move.name} className="capitalize" />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default PokemonDetails;
