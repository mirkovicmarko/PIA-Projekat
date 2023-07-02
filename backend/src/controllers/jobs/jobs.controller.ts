import accept_impl from "./implementations/accept";
import decline_impl from "./implementations/decline";
import get_all_impl from "./implementations/get_all";


export default class AgenciesController {
    get_all = get_all_impl;
    accept = accept_impl;
    decline = decline_impl;
}