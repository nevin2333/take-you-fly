import { Injectable } from '@angular/core';

import * as moment from 'moment';

const download = require('downloadjs');

/**
 * Created by atyun on 8/2/16.
 */

@Injectable()
export class DataHelper {

  /**
   * 判断对象本身是否为空
   * @param obj
   * @returns {boolean}
   */
  isOwnEmpty(obj: Object) {
    for (const name in obj) {
      return false;
    }
    return true;
  }

  encodeId($id) {
    let $sid = ($id & 0xff000000);
    $sid += ($id & 0x0000ff00) << 8;
    $sid += ($id & 0x00ff0000) >> 8;
    $sid += ($id & 0x0000000f) << 4;
    $sid += ($id & 0x000000f0) >> 4;
    $sid ^= 11184810;
    return $sid;
  }

  /**
   * 对通过encodeId混淆的id进行还原
   */
  decodeId($sid) {

    $sid ^= 11184810;
    let $id = ($sid & 0xff000000);
    $id += ($sid & 0x00ff0000) >> 8;
    $id += ($sid & 0x0000ff00) << 8;
    $id += ($sid & 0x000000f0) >> 4;
    $id += ($sid & 0x0000000f) << 4;
    return $id;
  }

  /**
   * 以长度分割
   * @param list
   * @param chunkSize
   * @returns {Array}
   */
  chunk(list: any[], chunkSize: number) {
    if (!list.length) {
      return [];
    }
    if (typeof chunkSize === undefined) {
      chunkSize = 10;
    }

    let i, j, t, chunks = [];
    for (i = 0, j = list.length; i < j; i += chunkSize) {
      t = list.slice(i, i + chunkSize);
      chunks.push(t);
    }

    return chunks;
  }

  /**
   * 对字符串排序并且进行反转
   * @param a
   * @returns {string}
   */
  sortChars(a: string) {
    return a.split('').sort(
    ).reverse().join('');
  }

  /**
   * 格式化日期参数
   * @param date
   * @returns {string}
   * @constructor
   */
  FormatDate(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  FormatDatetime(date: Date) {
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes();
    const second = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + minutes + ':' + second;
  }

  /**
   * 深度拷贝 防止相同绑定数据同时需改
   * @param oldObj
   * @returns {any}
   */

  deepCopy(oldObj: any) {
    let newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
      for (const i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }

  moment_from(value) {
    const current = moment();
    const to = moment(value);
    return current.to(to);
  }

  /**
   * 删除数组中某个元素
   */

  delete_e_from_array(array: any[], value: any): any[] {

    const index = array.indexOf(value);
    if (index > -1) {
      return array.splice(index, 1);
    }

    return array;

  }

  isPhoneNumber(phone: any) {
    const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      return false;
    }
    return true;
  }

  isEmailAdress(emailAdress: any) {
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!reg.test(emailAdress)) {
      return false;
    }

    return true;
  }

  getChinese(strValue: string): string {
    if (strValue !== null && strValue !== '') {
      const reg = /[\u4e00-\u9fa5]/g;
      return strValue.match(reg).join('');
    } else {
      return '';
    }
  }

  getTextFromHtml(strValue: string): string {
    if (strValue !== null && strValue !== '') {
      return strValue.replace(/<\/?.+?>/g, '').replace(/&nbsp;/g, '');
    } else {
      return '';
    }
  }

  /**
   * 文件大小转换
   */
  readablizeBytes(bytes: number): string {
    if (bytes <= 0) {
      return '0KB';
    }
    const s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + ' ' + s[e];
  }

  /**
   * 判断数组bb 是否包含 aa，相当于ruby的 .includes
   */
  isContained(aa, bb) {
    if (!(aa instanceof Array) || !(bb instanceof Array) || ((aa.length < bb.length))) {
      return false;
    }
    for (let i = 0; i < bb.length; i++) {
      if (aa.indexOf(bb[i]) < 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * 判断数组a  b，是否具有相同的值
   */
  isHave(a: any[], b: any[]): boolean {
    if (!(a instanceof Array) || !(b instanceof Array)) {
      return false;
    }
    for (let i = 0; i < b.length; i++) {
      if (a.indexOf(b[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  // 获取当前浏览器名称

  ExplorerType() {
    const explorer = window.navigator.userAgent;

    function compare(s) {
      return (explorer.indexOf(s) >= 0);
    }

    function ie11() {
      return ('ActiveXObject' in window);
    }

    if (compare('MSIE') || ie11()) {
      return 'ie';
    } else if (compare('Firefox') && !ie11()) {
      return 'Firefox';
    } else if (compare('Chrome') && !ie11()) {
      return 'Chrome';
    } else if (compare('Opera') && !ie11()) {
      return 'Opera';
    } else if (compare('Safari') && !ie11()) {
      return 'Safari';
    }
  }

  addDate(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    const m = d.getMonth() + 1;
    return d.getFullYear() + '-' + m + '-' + d.getDate();
  }

  /**
   * 判断是否是微信浏览器
   * @returns {boolean}
   */
  is_WeiXin(): boolean {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    const ua = window.navigator.userAgent.toLowerCase()

    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) !== null && ua.match(/MicroMessenger/i)['0'] === 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  is_PC(): boolean {
    var sUserAgent = <any>navigator.userAgent.toLowerCase();
    var bIsIpad = <any>sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = <any>sUserAgent.match(/IPHONE os/i) == "iphone os";
    var bIsMidp = <any>sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = <any>sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = <any>sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = <any>sUserAgent.match(/android/i) == "android";
    var bIsCE = <any>sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = <any>sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
      return true;
    } else {
      return false;
    }
  }

  downloadFile(file_url: string, file_name: string): void {
    const x = new XMLHttpRequest();
    x.open('GET', file_url, true);
    x.responseType = 'blob';
    x.onload = (e: any) => {
      download(e.target.response, file_name, 'image/png');
    };
    x.send();
  }

  client_type(): string {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return 'mobile';
    } else if (navigator.userAgent.match(/iPad/i) != null) {
      return 'ipad';
    } else {
      return 'pc';
    }
  }
}
