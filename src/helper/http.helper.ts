import {Injectable} from "@angular/core";
import {Response, Headers, Http, RequestOptions, URLSearchParams} from '@angular/http'

@Injectable()
export class HttpHelper {
  constructor(public http: Http){

  }

  /**
   * 获取response里的data 并且转换成JSON 并且进行status 处理
   * @param res
   * @returns {any}
   */
  public extractData(res: Response) {
    let body = res.json();
    if (body.status && body.status.code === "40100") {
      localStorage.clear()
      return {}
    }
    if (body.status && body.status.code !== "20000") {
      return {}
    } else {
      return body.data || body || {code: body.status.code};
    }

  }

  public AUTH_HTTP_GET(url: any, params = new URLSearchParams(), headers = new Headers({'Content-Type': 'application/json'})) {
    return this.http.get(url, {search: params})
  }

  public AUTH_HTTP_PUT(url: string, body: Object, headers = new Headers({'Content-Type': 'application/json'})){
    let options = new RequestOptions({headers: headers});
    body["access_token"] = 'asasdasdasdasd'
    body["user_session_key"] = 'asasdasdasdasd'
    return this.http.put(url, JSON.stringify(body), options)
  }

}
