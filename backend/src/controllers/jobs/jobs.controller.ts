import offer from "./implementations/offer";
import decline_request from "./implementations/decline_request";
import get from "./implementations/get";
import request from "./implementations/request";
import accept_offer from "./implementations/accept_offer";
import decline_offer from "./implementations/decline_offer";


export default class AgenciesController {
    get_all = get;
    get = get;
    request = request;
    offer = offer;
    decline_request = decline_request;
    accept_offer = accept_offer;
    decline_offer = decline_offer;
}