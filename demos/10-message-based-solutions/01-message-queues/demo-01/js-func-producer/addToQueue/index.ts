import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { OrderItem } from './order-item';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const msg = req.body as OrderItem;

    if (msg) {
        context.bindings.orderItem = JSON.stringify(msg);
    }

    context.res = {
        status: 200,
    };
};

export default httpTrigger;
