import React, { useState, useEffect, useRef } from "react";
import UploadService from "../services/FileUploadService";
const UploadFiles = () => {
  
    const UploadFiles = () => {
        const [selectedFiles, setSelectedFiles] = useState(undefined);
        const [progressInfos, setProgressInfos] = useState({ val: [] });
        const [message, setMessage] = useState([]);
        const [fileInfos, setFileInfos] = useState([]);
        const progressInfosRef = useRef(null)
        
      }

      const selectFiles = (event) => {
        setSelectedFiles(event.target.files);
        setProgressInfos({ val: [] });
      };
};
export default UploadFiles;