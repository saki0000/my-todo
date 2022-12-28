import { useState } from "react";
import { updateTaskAPI } from "../api/UpdateApi";
const useDistribute = (task: any) => {
  const [box, setBox] = useState<string>();
  const body = { ...task, box: box };
  const distributeTask = updateTaskAPI;
  return [box, setBox, distributeTask];
};

export default useDistribute;
