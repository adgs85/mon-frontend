

export interface IFetchParams {
    url: string
    successFunction?: (result: any) => void;
    errorFunction?: (error: any) => void;
}


export function genericGetFetch(fetchParams: IFetchParams) {
    fetch(fetchParams.url,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            if (response.status < 300 && response.status < 300) {
                return response.json()
            }
            console.error("Unexpected https status:" + response.status);
            if (fetchParams.errorFunction) {
                fetchParams.errorFunction(response.status);
            }
            return Promise.reject(response.status);
        }
        ).catch(function (ex) {
            if (fetchParams.errorFunction) {
                fetchParams.errorFunction(ex);
            }
        }).then((json: any) => {
            if (!json) {
                return null;
            }
            if (fetchParams.successFunction) {
                fetchParams.successFunction(json);
            }
        })


}
