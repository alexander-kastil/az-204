import { DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from '../../../environments/environment';

export const foodDataServiceConfig: DefaultDataServiceConfig = {
    root: `${environment.catalogApi}/`,
    timeout: 3000,
    entityHttpResourceUrls: {
        Food: {
            entityResourceUrl: `${environment.catalogApi}food/`,
            collectionResourceUrl: `${environment.catalogApi}food`
        },
    }
}