import { apiRequest } from "../../Document/API";
import { transformDataForApi } from "../../helper";

export const submitDocument = async (document) => {  
  const payload = document && transformDataForApi(document);
  const endpoint = "https://wealthuat.hdfcbank.com/UATEOL/API/database/insert_doc_with_qna";

  return apiRequest(endpoint, "POST", payload);
};
