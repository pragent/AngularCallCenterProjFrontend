interface Time {
  hour: number;
  minute: number;
  second: number;
}

function isTime(tbd: Time) {
  return (
    tbd.hour !== undefined &&
    tbd.minute !== undefined &&
    tbd.second !== undefined
  );
}

export const convertJsonToTime = json => {
  return Object.keys(json).reduce((acc, cur, idx) => {
    acc += json[cur];
    if (typeof json[cur] === "number" && idx !== Object.keys(json).length - 1) {
      acc += ":";
    }
    return acc;
  }, "");
};

export const convertDateToString = date => {
  return `${date
    .getFullYear()
    .toString()}-${(date.getMonth() + 1).toString()}-${date.getDate()}`;
};

export const convertStringToDate = (
  str: string,
  fromStringifiedJSON: boolean,
) => {
  if (fromStringifiedJSON) {
    str = str.slice(0, str.indexOf("T"));
  }

  const regex = /^(.*)[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
  const match = str.match(regex);
  const y = parseInt(match[1]),
    m = parseInt(match[2]),
    d = parseInt(match[3]);

  const res = new Date(y, m, d);
  return res;
};

export const convertDateTimeToStr = json => {
  let res = "";
  
  res += json.date ? convertDateToString(json.date) + " " : "";
  res += json.time ? convertJsonToTime(json.time) : "";
  return res;
};

export const clearObject = json => {
  Object.keys(json).map(key => {
    if (json[key] instanceof Date) {
      json[key] = "";
    } else if (isTime(json[key])) {
      let time = clearObject(json[key]);
      json[key] = { ...time };
    } else if (typeof json[key] === "object") {
      clearObject(json[key]);
    } else if (typeof json[key] === "number") {
      json[key] = 0;
    } else {
      json[key] = "";
    }
  });
  return json;
};
