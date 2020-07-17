import { OntimizeEEService, Observable } from 'ontimize-web-ngx';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { CONFIG } from '../../../app.config';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AlbumService extends OntimizeEEService {
    getAlbum(id: number) {
        let requestBody = {
            "filter": {
                "id": String(id)
            }
        }
        const url = CONFIG.apiEndpoint + '/albums/albumSongs';
        var options = {
            headers: this.buildHeaders()
        };
        var self = this;
        var dataObservable = new Observable(function (_innerObserver) {
            self.httpClient.post(url,requestBody,options).subscribe(function (resp) { 
                self.parseSuccessfulQueryResponse(resp, _innerObserver);
            }, function (error) {
                self.parseUnsuccessfulQueryResponse(error, _innerObserver);
            }, function () { return _innerObserver.complete(); });
        });
        return dataObservable.pipe(share());
    }



    buildHeaders() {
        const appData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + appData.session.id
        });
    }
}
