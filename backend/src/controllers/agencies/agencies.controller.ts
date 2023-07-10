import get_all from "./implementations/get_all";
import get from "./implementations/get";
import rate from "./implementations/rate";
import delete_rating from "./implementations/delete_rating";


export default class AgenciesController {
    get_all = get_all;
    get = get;
    rate = rate;
    delete_rating = delete_rating;
}