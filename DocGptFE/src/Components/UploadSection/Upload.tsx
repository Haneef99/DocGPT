import { Card, Divider, Typography } from "@mui/joy";
import SelectExisting from "./SelectExisting";
import UploadNew from "./UploadNew";

const Upload = () => {

    return (
      <div>
        <Card
          color="success"
          orientation="vertical"
          size="lg"
          variant="soft"
          sx={{ width: "100%", height: "400px"}}
        >
          <Typography
            color="neutral"
            level="title-lg"
            noWrap={false}
            sx={{ marginBottom: "30px" }}
          >
            Documents
          </Typography>

          <Typography color="neutral" level="body-md" noWrap={false}>
            Select a document
          </Typography>

          <SelectExisting />

          {/* or */}
          <Divider sx={{margin: '30px 0'}}>or</Divider>


          <UploadNew />

        </Card>
      </div>
    );

}

export default Upload;