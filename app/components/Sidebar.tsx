"use client";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Skeleton,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetPokemonTypesQuery } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedType } from "../store/features/typeSlice";
import { RootState } from "../store/store";

const Sidebar = () => {
  const { data, error, isLoading } = useGetPokemonTypesQuery({skip:false});
  const selectedType = useSelector(
    (state: RootState) => state.type.selectedType
  );
  const dispatch = useDispatch();

  if (error) {
    return <Typography>No Types found.Please try again.</Typography>;
  }

  return (
    <div>
      <Accordion defaultExpanded className="px-2 py-4">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" className="mb-3 font-semibold">
            Pokémon Types
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading && (
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  animation="wave"
                  key={i}
                  height={40}
                  width={70}
                >
                  <Chip />
                </Skeleton>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Chip
              label={"All"}
              onClick={() => dispatch(setSelectedType("All"))}
              className={`capitalize cursor-pointer ${
                selectedType === "All" && "!bg-[#cce4ff]"
              } hover:scale-105 transition-transform`}
              color="primary"
              variant="outlined"
            />
            {data?.results?.map((type: { name: string }, idx: number) => (
              <Chip
                key={idx}
                label={type.name}
                onClick={() => dispatch(setSelectedType(type.name))}
                className={`capitalize cursor-pointer ${
                  selectedType === type.name && "!bg-[#cce4ff]"
                } hover:scale-105 transition-transform`}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sidebar;
