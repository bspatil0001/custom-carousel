import Vue from 'vue';
import axios from './axios';

var ajaxConfig = {
  contentType: 'application/json',
  crossDomain: true
}

const url = "https://api.myjson.com/bins/1fx5bw";

let getProducts = function () {
  return axios().get(url);
}

export default {
  getProducts: getProducts
};