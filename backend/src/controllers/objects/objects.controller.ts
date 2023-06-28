import change_impl from "./implementations/change";
import erase_impl from "./implementations/erase";
import get_impl from "./implementations/get";
import get_all_impl from "./implementations/get_all";
import make_impl from "./implementations/make";


export default class ObjectsController {
    make = make_impl;
    get_all = get_all_impl;
    get = get_impl;
    change = change_impl;
    erase = erase_impl;
}