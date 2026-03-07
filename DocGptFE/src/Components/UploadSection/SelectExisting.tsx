import { Option, Select } from "@mui/joy";
import type { DocumentItem } from "../../Redux/Api/RootApi";
import { useAppSelector } from "../../Redux/Store";
import { selectDocuments } from "../../Redux/Slice/DocumentSlice";
import { useEffect, useState } from "react";
import { useSearchDocumentsMutation } from "../../Redux/Api/RootApi";

const SelectExisting = () =>{

    const documents: DocumentItem[] = useAppSelector(selectDocuments);
    const [docID, SetDocId] = useState<string>("");

    const [searchDocuments] = useSearchDocumentsMutation();
    const handleTestSearch = async () => {
      try {
        const result = await searchDocuments({
          query: "What is the recommended ratio for the protected segment?",
          top_k: 5,
        }).unwrap();
        console.log("Search results:", result);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    useEffect(() => {
      handleTestSearch();
    }, []);

    const handleSelectChange = (value: string) => {
      SetDocId(value);
    };

    useEffect(() => {
      console.log("Selected Document ID:", docID);
    }, [docID]);

    return (
      <div>
        <Select 
        placeholder="Choose a document..." 
        value={docID}
        onChange={(_, value) => handleSelectChange(value as string)}
        sx={{ width: "350px" }}
        
        >
          <Option value="">None</Option>
          {documents.map((doc, index) => (
            <Option value={doc.id} key={index}>{doc.filename}</Option>
          ))}
        </Select>
      </div>
    );

}

export default SelectExisting;