import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MatchesModel } from './matches.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MatchesService {
    private apiUrl = 'http://localhost:3001/matches/';

    startedEditing = new Subject<number>();

    constructor(private http: Http) { }

    addMatch(match: MatchesModel): Promise<any> {
        return this.http.post(this.apiUrl, match)
        .toPromise()
        .then(this.handleData)
        .catch(this.handleError);
    }

    getMatches() {
        return this.http.get(this.apiUrl)
        .toPromise()
        .then(this.handleData)
        .catch(this.handleError);
    }

    getMatch(id: string) {
        return this.http.get(this.apiUrl + id)
        .toPromise()
        .then(this.handleData)
        .catch(this.handleError);
    }

    private handleData(res: any) {
        const body = res.json();
        console.log(body); // for development purposes only
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for development purposes only
        return Promise.reject(error.message || error);
    }
}
