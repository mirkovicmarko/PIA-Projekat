import get_all_impl from "./implementations/get_all";
import get_impl from "./implementations/get";


export class AgenciesController {
    get_all = get_all_impl;
    get = get_impl;
}