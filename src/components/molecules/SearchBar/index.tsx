import React from "react";
import TextField from "../../../components/atoms/TextField";
import Button from '../../../components/atoms/Button'
import { IconButton } from "@mui/material";
import { Mic as MicIcon, Search as SearchIcon } from "@mui/icons-material";
// import Button from "@atoms/Button";

type SearchBarProps = {
  onClick: () => void;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  string: Record<string,string>
}

const SearchBar: React.FC<SearchBarProps> = ({
  onClick,
  onQueryChange,
  value,
  placeholder = "Search...",
  string
}) => {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      variant="outlined"
      value={value}
      multiline
      onChange={onQueryChange}
      sx={{ backgroundColor: "#fff", borderRadius: 1, margin: '8px 0px' }}
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "#004a92", mr: 1 }} />,
        endAdornment: (
          <>
            <IconButton onClick={onClick}>
              <MicIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#ff0000",
                color: "#fff",
                marginLeft: 1,
              }}
              onClick={onClick}
              // label={`Search`}
              label={string.search}
            />
          </>
        ),
      }}
    />
  );
};

export default SearchBar;
