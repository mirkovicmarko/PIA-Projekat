import get_all_impl from "./implementations/get_all";
import get_impl from "./implementations/get";
import request_job_impl from "./implementations/request_job";


export default class AgenciesController {
    get_all = get_all_impl;
    get = get_impl;
    request_job = request_job_impl;
}