export function validateUrls(url : string, surl : string) {
    if (!(url && surl )) {
        return "Required";
    }
    else if (!new RegExp(/^[a-z0-9]+$/i).test(surl)){
    }
}