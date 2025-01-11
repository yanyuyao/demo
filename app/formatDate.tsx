const formatDate = (date: any) => {
  if (date === null || date === undefined) return '';

  if (date.toString().length > 10) {
    // const options = { year: 'numeric', month: 'MM', day: '2-digit' };
    // const formatter = new Intl.DateTimeFormat('zh-Hans-CN', options);
    // return formatter.format(new Date(date)).replace(/\//g, '-');
    //format date to May 10, 2019
    date = new Date(date);
    return date.toDateString().slice(4, 15);
  } else {
    date = date.toString().slice(0, 10);
    return date;
  }
};

export default formatDate;
