import edit_impl from "./implementations/edit";
import erase_impl from "./implementations/erase";
import get_impl from "./implementations/get";
import get_all_impl from "./implementations/get_all";
import insert_impl from "./implementations/insert";
import more_workers_impl from "./implementations/more_workers";


export default class WorkersController {
    insert = insert_impl;
    get_all = get_all_impl;
    get = get_impl;
    edit = edit_impl;
    erase = erase_impl;
    more_workers = more_workers_impl;
}