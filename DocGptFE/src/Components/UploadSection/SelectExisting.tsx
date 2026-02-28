import { Select } from "@mui/joy";

const SelectExisting = () =>{

    return (
      <div>
        <Select
          placeholder="Choose a document..."
          sx={{ width: "350px" }}
        ></Select>
      </div>
    );

}

export default SelectExisting;