import { callPasswordGeneratorAPI } from "./ApiModule.mjs";
import { getToLocal } from "./util.mjs";

//Generate Password from api
export async function generatePasswordFromAPI(length, apiKey) {
  try {
    const password = await callPasswordGeneratorAPI({ length, apiKey });
    return password;
  } catch (error) {
    console.error("Error generating password: ", error);
    return null;
  }
}

export function showHistory(historyBoxElement) {
  const history = getToLocal();
  console.log(history);

  historyBoxElement.innerHTML = history
    .map((item) => `<li style = "color: ${item.color}">${item.password}</li>`)
    .join("");
}
