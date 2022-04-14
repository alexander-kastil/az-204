import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import productsService from "../services/productsService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  let response;

  try {
    const id = req.params.id;
    const brand = req.body.brand;
    const result = await productsService.delete(id, brand.name);
    response = { body: result, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;
