import moment from "moment/moment";
import "moment/locale/es";
moment.locale("es");

//time ago moment format
export function TimeAgoHourFormat(time) {
  return moment(time).fromNow();
}

export function FormatDate() {
  return moment().format();
}

//Text line
export function FormatLineBreak(text) {
  return text.split("\n").map((str, index) => <li key={index}>{str}</li>);
}

// type money
export function formatNumberMoney(ammount) {
  return new Intl.NumberFormat("ES-PE", {
    style: "currency",
    currency: "PEN",
  }).format(ammount);
}

//copy

export function copyGlobal(value) {
  navigator.clipboard.writeText(value);
}

//disable scroll
export function disableScroll() {
  var TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  var LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(LeftScroll, TopScroll);
  };
}

//enable Scroll
export function enableScroll() {
  window.onscroll = function () {};
}

// hostory
export const HitoryGo = () => {
  window.history.go(-1);
};
export const History = () => {
  window.history.go(1);
};
