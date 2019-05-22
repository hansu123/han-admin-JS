// import request from "../utils/request";
import {get,post} from "@/utils/request"

export function getDecList(params){
return get({
url:"user/decList",
params
})
}

