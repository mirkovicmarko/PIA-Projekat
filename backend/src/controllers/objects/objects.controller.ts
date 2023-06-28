import get_all_impl from "./implementations/get_all";
import make_impl from "./implementations/make";


export default class ObjectsController {
    make = make_impl;
    get_all = get_all_impl;
}