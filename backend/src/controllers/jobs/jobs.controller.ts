import offer from "./implementations/offer";
import decline_request from "./implementations/decline_request";
import get from "./implementations/get";
import request from "./implementations/request";
import accept_offer from "./implementations/accept_offer";
import decline_offer from "./implementations/decline_offer";
import allocate_workers from "./implementations/allocate_workers";
import update_object_status from "./implementations/update_object_status";
import pay from "./implementations/pay";
import cancellation_request from "./implementations/cancellation_request";
import allow_cancellation from "./implementations/allow_cancellation";
import deny_cancellation from "./implementations/deny_cancellation";


export default class AgenciesController {
    get_all = get;
    get = get;
    request = request;
    offer = offer;
    decline_request = decline_request;
    accept_offer = accept_offer;
    decline_offer = decline_offer;
    allocate_workers = allocate_workers;
    update_object_status = update_object_status;
    pay = pay;
    cancellation_request = cancellation_request;
    allow_cancellation = allow_cancellation;
    deny_cancellation = deny_cancellation;
}