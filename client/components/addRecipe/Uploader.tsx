import React from "react";
// import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

export default function AdvanceDemo() {
  return (
    <div className="card">
      <FileUpload
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
}
