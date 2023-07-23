require('./kamadatepicker.scss');

window.kamaDatepicker = kamaDatepicker;

function kamaDatepicker(elementID, opt) {
  // check arguments
  if (
    ['string', 'object'].indexOf(typeof elementID) === -1 ||
    (typeof elementID === 'object' && elementID === null) ||
    (typeof elementID === 'strinf' && elementID.length === 0)
  ) {
    console.error(
      'kamadatepicker error: input ID is not an object, string or is an empty strong!'
    );
    return;
  }
  var options = opt || {};

  // variables
  var isCalClicked = false;
  var isSynced = false;

  var dayOfWeek;

  var selectedYear;
  var selectedMonth;
  var selectedDay;

  var currentYear;
  var currentMonth;
  var currentDay;

  var todaysYear;
  var todaysMonth;
  var todaysDay;

  var dayOfWeekJ;

  var numberOfDays;

  var todayG;
  var todaysJ;

  // consts
  var MONTH_NAMES = {
    1: 'فروردین',
    2: 'اردیبهشت',
    3: 'خرداد',
    4: 'تیر',
    5: 'مرداد',
    6: 'شهریور',
    7: 'مهر',
    8: 'آبان',
    9: 'آذر',
    10: 'دی',
    11: 'بهمن',
    12: 'اسفند',
  };
  var DAY_NAMES = {
    شنبه: 'ش',
    یکشنبه: 'ی',
    دوشنبه: 'د',
    'سه شنبه': 'س',
    چهارشنبه: 'چ',
    'پنج شنبه': 'پ',
    جمعه: 'ج',
  };
  var FA_NUMS = [
    '٠',
    '١',
    '٢',
    '٣',
    '۴',
    '۵',
    '۶',
    '٧',
    '٨',
    '٩',
    '١٠',
    '١١',
    '١٢',
    '١٣',
    '١۴',
    '١۵',
    '١۶',
    '١٧',
    '١٨',
    '١٩',
    '٢٠',
    '٢١',
    '٢٢',
    '٢٣',
    '٢۴',
    '٢۵',
    '٢۶',
    '٢٧',
    '٢٨',
    '٢٩',
    '٣٠',
    '٣١',
    '٣٢',
  ];
  var HOLIDAYS = [
    { month: 1, day: 1 },
    { month: 1, day: 2 },
    { month: 1, day: 3 },
    { month: 1, day: 4 },
    { month: 1, day: 12 },
    { month: 1, day: 13 },
    { month: 3, day: 14 },
    { month: 3, day: 15 },
    { month: 11, day: 22 },
    { month: 12, day: 29 },
  ];

  // set options
  options.placeholder =
    options.placeholder !== undefined ? options.placeholder : '';
  options.twodigit = options.twodigit !== undefined ? options.twodigit : true;
  options.closeAfterSelect =
    options.closeAfterSelect !== undefined ? options.closeAfterSelect : true;
  options.nextButtonIcon =
    options.nextButtonIcon !== undefined ? options.nextButtonIcon : false;
  options.previousButtonIcon =
    options.previousButtonIcon !== undefined
      ? options.previousButtonIcon
      : false;
  options.buttonsColor =
    options.buttonsColor !== undefined ? options.buttonsColor : false;
  options.forceFarsiDigits =
    options.forceFarsiDigits !== undefined ? options.forceFarsiDigits : false;
  options.markToday =
    options.markToday !== undefined ? options.markToday : false;
  options.markHolidays =
    options.markHolidays !== undefined ? options.markHolidays : false;
  options.highlightSelectedDay =
    options.highlightSelectedDay !== undefined
      ? options.highlightSelectedDay
      : false;
  options.sync = options.sync !== undefined ? options.sync : false;
  options.gotoToday =
    options.gotoToday !== undefined ? options.gotoToday : false;
  options.pastYearsCount = !isNaN(options.pastYearsCount)
    ? options.pastYearsCount
    : 95;
  options.futureYearsCount = !isNaN(options.futureYearsCount)
    ? options.futureYearsCount
    : 6;
  options.holidays = options.holidays || HOLIDAYS;
  options.disableHolidays =
    options.disableHolidays !== undefined ? options.disableHolidays : false;

  function generateGuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
      if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-';
      i = Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase();
      result = result + i;
    }
    return result;
  }

  // create DOM
  var inputElement;
  if (typeof elementID === 'string') {
    inputElement = $('#' + elementID);
  } else {
    inputElement = $(elementID);
    elementID = generateGuid();
  }

  if (inputElement.attr('placeholder') === undefined) {
    inputElement.attr('placeholder', options.placeholder);
  }

  // create parent div
  inputElement.wrap(
    "<div id='bd-root-" + elementID + "' style='position: relative;'></div>"
  );

  // create main div for calendar, below input element
  inputElement.after(
    "<div id='bd-main-" +
      elementID +
      "' class='bd-main bd-hide' style='position: absolute; direction: rtl;'></div>"
  );
  var mainDiv = $('#bd-main-' + elementID);

  // create calendar div inside main div
  mainDiv.append("<div class='bd-calendar'></div>");
  var calendarDiv = mainDiv.find('.bd-calendar');

  // create title div and table inside calendar div
  calendarDiv.append("<div class='bd-title'></div>");
  var titleDiv = calendarDiv.find('.bd-title');
  calendarDiv.append(
    "<table class='bd-table' dir='rtl' cellspacing='0' cellpadding='0'></table>"
  );

  // create month and year drop downs and next/prev month buttons inside title div
  if (options.swapNextPrev)
    titleDiv.append(
      "<button id='bd-prev-" +
        elementID +
        "' class='bd-prev' type='button' title='ماه قبلی' data-toggle='tooltip'><span>قبلی</span></button>"
    );
  else
    titleDiv.append(
      "<button id='bd-next-" +
        elementID +
        "' class='bd-next' type='button' title='ماه بعدی' data-toggle='tooltip'><span>بعدی</span></button>"
    );

  titleDiv.append(
    "<div class='bd-dropdown'></div><div class='bd-dropdown'></div>"
  );
  titleDiv
    .find('.bd-dropdown:nth-child(2)')
    .append(
      "<select id='bd-month-" + elementID + "' class='bd-month'></select>"
    );
  titleDiv
    .find('.bd-dropdown:nth-child(3)')
    .append("<select id='bd-year-" + elementID + "' class='bd-year'></select>");

  if (options.swapNextPrev)
    titleDiv.append(
      "<button id='bd-next-" +
        elementID +
        "' class='bd-next' type='button' title='ماه بعدی' data-toggle='tooltip'><span>بعدی</span></button>"
    );
  else
    titleDiv.append(
      "<button id='bd-prev-" +
        elementID +
        "' class='bd-prev' type='button' title='ماه قبلی' data-toggle='tooltip'><span>قبلی</span></button>"
    );

  var nextMonth = $('#bd-next-' + elementID);
  if (options.nextButtonIcon) {
    nextMonth.find('span').css('display', 'none');
    if (options.nextButtonIcon.indexOf('.') !== -1) {
      // image
      nextMonth.css('background-image', 'url(' + options.nextButtonIcon + ')');
    } else {
      // css class
      nextMonth.addClass(options.nextButtonIcon);
    }
  }

  var monthDropdown = $('#bd-month-' + elementID);
  $.each(MONTH_NAMES, function (key, value) {
    monthDropdown.append($('<option></option>').attr('value', key).text(value));
  });

  var yearDropdown = $('#bd-year-' + elementID);

  var prevMonth = $('#bd-prev-' + elementID);
  if (options.nextButtonIcon) {
    prevMonth.find('span').css('display', 'none');
    if (options.previousButtonIcon.indexOf('.') !== -1) {
      // image
      prevMonth.css(
        'background-image',
        'url(' + options.previousButtonIcon + ')'
      );
    } else {
      // css class
      prevMonth.addClass(options.previousButtonIcon);
    }
  }

  if (options.buttonsColor) {
    nextMonth.css('color', options.buttonsColor);
    nextMonth.find('span').css('color', options.buttonsColor);
    prevMonth.css('color', options.buttonsColor);
    prevMonth.find('span').css('color', options.buttonsColor);
  }

  // create table header and body
  calendarDiv.find('.bd-table').append('<thead><tr></tr></thead>');
  $.each(DAY_NAMES, function (key, value) {
    calendarDiv.find('.bd-table thead tr').append($('<th></th>').text(value));
  });

  calendarDiv
    .find('.bd-table')
    .append(
      "<tbody id='bd-table-days-" +
        elementID +
        "' class='bd-table-days'></tbody>"
    );
  var daysTable = $('#bd-table-days-' + elementID);

  // create go to todays button
  if (options.gotoToday) {
    calendarDiv.append("<div class='bd-goto-today'>برو به امروز</div>");
    var gotoToday = calendarDiv.find('.bd-goto-today');
  }

  // opening and closing functionality
  inputElement
    .on('focus', function () {
      mainDiv.removeClass('bd-hide');
      if (options.sync && isSynced === false) {
        syncCalendar();
        isSynced = true;
      }
      setCalendarPosition();
    })
    .on('blur', function () {
      if (isCalClicked == false) {
        mainDiv.addClass('bd-hide');
        isSynced = false;
      } else {
        isCalClicked = false;
        inputElement.focus();
        event.preventDefault();
      }
    });

  mainDiv.on('mousedown', function (event) {
    isCalClicked = true;
  });

  // dropdown events
  monthDropdown.on('change', function () {
    selectedMonth = parseInt(this.value);
    numberOfDays = monthDays(selectedYear, selectedMonth);
    dayOfWeekJ = findFirstDayOfMonth(selectedYear, selectedMonth);
    drawDays(numberOfDays, dayOfWeekJ);
    setCalendarPosition();
  });
  yearDropdown.on('change', function () {
    selectedYear = parseInt(this.value);
    numberOfDays = monthDays(selectedYear, selectedMonth);
    dayOfWeekJ = findFirstDayOfMonth(selectedYear, selectedMonth);
    drawDays(numberOfDays, dayOfWeekJ);
    setCalendarPosition();
  });

  function setCalendarPosition() {
    let calendarContainer = document.querySelector(`#bd-main-${elementID}`);
    let input = inputElement.length === 1 ? inputElement[0] : inputElement;

    input.offsetHeight; // input height
    calendarContainer.offsetHeight; // calendar height;

    if (options.position === 'top') {
      calendarContainer.style.top = `${-1 * calendarContainer.offsetHeight}px`; // top
    } else if (options.position === 'auto') {
      // find parent element
      let parentElement;
      if (options.parentId)
        parentElement = document.querySelector(`#${options.parentId}`);

      if (!options.parentId || !parentElement)
        parentElement = document.querySelector(`#bd-root-${elementID}`);

      let elementsDistance = getDistanceBetweenElements(parentElement, input);

      if (
        parentElement.offsetHeight -
          elementsDistance -
          (input.offsetHeight + calendarContainer.offsetHeight) >
        0
      )
        calendarContainer.style.top = `${input.offsetHeight}px`;
      // bottom
      else if (
        elementsDistance -
          (input.offsetHeight + calendarContainer.offsetHeight) >
        0
      )
        calendarContainer.style.top = `${
          -1 * calendarContainer.offsetHeight
        }px`;
      // top
      else calendarContainer.style.top = `${input.offsetHeight}px`; // bottom
    } else {
      // bottom or any other values
      calendarContainer.style.top = `${input.offsetHeight}px`; // bottom
    }

    let isOut = isOutOfViewport(calendarContainer);
    if (isOut.left) calendarContainer.style.left = 0;

    function getPositionAtCenter(element) {
      const { top, left } = element.getBoundingClientRect();
      return {
        x: left,
        y: top,
      };
    }
    function getDistanceBetweenElements(a, b) {
      const aPosition = getPositionAtCenter(a);
      const bPosition = getPositionAtCenter(b);

      return Math.abs(aPosition.y - bPosition.y);
    }
    function isOutOfViewport(elem) {
      // Get element's bounding
      var bounding = elem.getBoundingClientRect();

      // Check if it's out of the viewport on each side
      var out = {};
      out.top = bounding.top < 0;
      out.left = bounding.left < 0;
      out.bottom =
        bounding.bottom >
        (window.innerHeight || document.documentElement.clientHeight);
      out.right =
        bounding.right >
        (window.innerWidth || document.documentElement.clientWidth);
      out.any = out.top || out.left || out.bottom || out.right;
      out.all = out.top && out.left && out.bottom && out.right;

      return out;
    }
  }

  // Georgian to Jalali converter (minified)
  // source is unknown. contact if you know the code owner.
  function gregorianToJalali(a, r, s) {
    (a = parseInt(a)), (r = parseInt(r)), (s = parseInt(s));
    for (
      var n = a - 1600,
        e = r - 1,
        t = s - 1,
        p =
          365 * n +
          parseInt((n + 3) / 4) -
          parseInt((n + 99) / 100) +
          parseInt((n + 399) / 400),
        I = 0;
      e > I;
      ++I
    )
      p += g_days[I];
    e > 1 && ((n % 4 == 0 && n % 100 != 0) || n % 400 == 0) && ++p, (p += t);
    var v = p - 79,
      d = parseInt(v / 12053);
    v %= 12053;
    var o = 979 + 33 * d + 4 * parseInt(v / 1461);
    (v %= 1461),
      v >= 366 && ((o += parseInt((v - 1) / 365)), (v = (v - 1) % 365));
    for (var I = 0; 11 > I && v >= j_days[I]; ++I) v -= j_days[I];
    var y = I + 1,
      _ = v + 1;
    return [o, y, _];
  }
  var g_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  // Jalali to Georgian converter (minified)
  // source is unknown. contact if you know the code owner.
  function toJalaali(d, i, a) {
    return d2j(g2d(d, i, a));
  }
  function toGregorian(d, i, a) {
    return d2g(j2d(d, i, a));
  }
  function isValidJalaaliDate(d, i, a) {
    return (
      d >= -61 &&
      3177 >= d &&
      i >= 1 &&
      12 >= i &&
      a >= 1 &&
      a <= jalaaliMonthLength(d, i)
    );
  }
  function isLeapJalaaliYear(d) {
    return 0 === jalCal(d).leap;
  }
  function jalaaliMonthLength(d, i) {
    return 6 >= i ? 31 : 11 >= i ? 30 : isLeapJalaaliYear(d) ? 30 : 29;
  }
  function jalCal(d) {
    var i,
      a,
      n,
      r,
      t,
      o,
      v,
      e = [
        -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
        2192, 2262, 2324, 2394, 2456, 3178,
      ],
      l = e.length,
      u = d + 621,
      m = -14,
      g = e[0];
    if (g > d || d >= e[l - 1]) throw new Error('Invalid Jalaali year ' + d);
    for (v = 1; l > v && ((i = e[v]), (a = i - g), !(i > d)); v += 1)
      (m = m + 8 * div(a, 33) + div(mod(a, 33), 4)), (g = i);
    return (
      (o = d - g),
      (m = m + 8 * div(o, 33) + div(mod(o, 33) + 3, 4)),
      4 === mod(a, 33) && a - o === 4 && (m += 1),
      (r = div(u, 4) - div(3 * (div(u, 100) + 1), 4) - 150),
      (t = 20 + m - r),
      6 > a - o && (o = o - a + 33 * div(a + 4, 33)),
      (n = mod(mod(o + 1, 33) - 1, 4)),
      -1 === n && (n = 4),
      { leap: n, gy: u, march: t }
    );
  }
  function j2d(d, i, a) {
    var n = jalCal(d);
    return g2d(n.gy, 3, n.march) + 31 * (i - 1) - div(i, 7) * (i - 7) + a - 1;
  }
  function d2j(d) {
    var i,
      a,
      n,
      r = d2g(d).gy,
      t = r - 621,
      o = jalCal(t),
      v = g2d(r, 3, o.march);
    if (((n = d - v), n >= 0)) {
      if (185 >= n)
        return (
          (a = 1 + div(n, 31)), (i = mod(n, 31) + 1), { jy: t, jm: a, jd: i }
        );
      n -= 186;
    } else (t -= 1), (n += 179), 1 === o.leap && (n += 1);
    return (a = 7 + div(n, 30)), (i = mod(n, 30) + 1), { jy: t, jm: a, jd: i };
  }
  function g2d(d, i, a) {
    var n =
      div(1461 * (d + div(i - 8, 6) + 100100), 4) +
      div(153 * mod(i + 9, 12) + 2, 5) +
      a -
      34840408;
    return (n = n - div(3 * div(d + 100100 + div(i - 8, 6), 100), 4) + 752);
  }
  function d2g(d) {
    var i, a, n, r, t;
    return (
      (i = 4 * d + 139361631),
      (i = i + 4 * div(3 * div(4 * d + 183187720, 146097), 4) - 3908),
      (a = 5 * div(mod(i, 1461), 4) + 308),
      (n = div(mod(a, 153), 5) + 1),
      (r = mod(div(a, 153), 12) + 1),
      (t = div(i, 1461) - 100100 + div(8 - r, 6)),
      { gy: t, gm: r, gd: n }
    );
  }
  function div(d, i) {
    return ~~(d / i);
  }
  function mod(d, i) {
    return d - ~~(d / i) * i;
  }

  var syncCalendar = function () {
    var inputValue = fixDate(inputElement.val());
    if (inputValue === '') return;

    inputValue = inputValue.split('/');
    monthDropdown.val(parseInt(inputValue[1]));
    monthDropdown.trigger('change');
    yearDropdown.val(parseInt(inputValue[0]));
    yearDropdown.trigger('change');

    if (options.highlightSelectedDay) {
      mainDiv.find('.bd-selected-day').removeClass('bd-selected-day');
      mainDiv
        .find('.day-' + parseInt(inputValue[2]))
        .addClass('bd-selected-day');
    }
  };

  var fixDate = function (date) {
    if (date === '') return '';

    date = date.split('/');
    // if (date[0].length === 2) {
    //     date[0] = "13" + date[0];
    // }
    if (date[1].length < 2) {
      if (date[1] < 10) {
        date[1] = '0' + date[1];
      }
    }
    if (date[2].length < 2) {
      if (date[2] < 10) {
        date[2] = '0' + date[2];
      }
    }
    date = date.join('/');
    return date;
  };

  var convertToJWeek = function (dayOfWeekG) {
    var dayOfWeekJ;
    if (dayOfWeekG < 6) {
      dayOfWeekJ = dayOfWeekG + 1;
    } else {
      dayOfWeekJ = 0;
    }
    return dayOfWeekJ;
  };

  var makeYearList = function (thisYear) {
    yearDropdown.find('option').remove();
    for (
      let i = 0;
      i < options.pastYearsCount + options.futureYearsCount;
      i++
    ) {
      var tempYear = thisYear - options.pastYearsCount + i + '';
      if (options.forceFarsiDigits) {
        for (var j = 0; j < 10; j++) {
          var rgx = new RegExp(j, 'g');
          tempYear = tempYear.replace(rgx, FA_NUMS[j]);
        }
      }
      yearDropdown.append(
        $('<option>', {
          value: thisYear - options.pastYearsCount + i,
          text: tempYear,
        })
      );
    }
  };

  // isleap calculator, supported year: 1243 - 1473
  var isLeapYear = function (year) {
    var mod;
    if (year > 1243 && year < 1473) {
      mod = year % 33;
      if (
        mod == 1 ||
        mod == 5 ||
        mod == 9 ||
        mod == 13 ||
        mod == 17 ||
        mod == 22 ||
        mod == 26 ||
        mod == 30
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return 'unknown';
    }
  };

  var monthDays = function (year, month) {
    if (month < 7) {
      return 31;
    } else if (month < 12) {
      return 30;
    } else {
      if (isLeapYear(year)) {
        return 30;
      } else {
        return 29;
      }
    }
  };

  // make first page of calendar
  todayG = new Date();

  todaysJ = gregorianToJalali(
    todayG.getFullYear(),
    todayG.getMonth() + 1,
    todayG.getDate()
  );
  var selectedDateJ = [];
  for (let i = 0; i < 3; i++) {
    selectedDateJ[i] = todaysJ[i];
  }

  todaysYear = todaysJ[0];
  todaysMonth = todaysJ[1];
  todaysDay = todaysJ[2];

  selectedYear = selectedDateJ[0];
  selectedMonth = selectedDateJ[1];
  selectedDay = selectedDateJ[2];

  monthDropdown.val(selectedMonth);
  makeYearList(selectedYear);
  yearDropdown.val(selectedYear);

  numberOfDays = monthDays(selectedYear, selectedMonth);

  // find first day of month in week
  var findFirstDayOfMonth = function (selectedYear, selectedMonth) {
    var firstDayOfMonthG = toGregorian(selectedYear, selectedMonth, 1);
    firstDayOfMonthG = new Date(
      firstDayOfMonthG.gy +
        '/' +
        firstDayOfMonthG.gm +
        '/' +
        firstDayOfMonthG.gd
    );
    return convertToJWeek(firstDayOfMonthG.getDay());
  };
  dayOfWeekJ = findFirstDayOfMonth(selectedYear, selectedMonth);

  // draw days on calendar
  var drawDays = function (numberOfDays, dayOfWeekJ) {
    daysTable.empty();
    var dayIndex = 1;
    var rowIndex = 1;
    while (dayIndex <= numberOfDays) {
      daysTable.append(
        $('<tr>', {
          class: 'tr-' + rowIndex,
        })
      );
      for (let i = 0; i < 7; i++) {
        if (dayIndex == 1) {
          var j = 0;
          while (j < dayOfWeekJ) {
            $('#bd-table-days-' + elementID + ' .tr-1').append(
              $('<td>', {
                class: 'bd-empty-cell',
              })
            );
            j++;
            i++;
          }
        }
        if (i < 7 && dayIndex <= numberOfDays) {
          var tempTD =
            '<td>' +
            '<button class="day day-' +
            dayIndex +
            '" type="button">' +
            (options.forceFarsiDigits ? FA_NUMS[dayIndex] : dayIndex) +
            '</button>' +
            '</td>';

          // mark todays day by adding .bd-today class
          if (options.markToday) {
            if (
              dayIndex == todaysDay &&
              todaysMonth == selectedMonth &&
              todaysYear == selectedYear
            ) {
              var idx = tempTD.indexOf('day day-');
              tempTD = tempTD.slice(0, idx) + ' bd-today ' + tempTD.slice(idx);
            }
          }

          // mark holidays by adding .bd-holiday class
          if (options.markHolidays) {
            let isHoliday = false;
            if (i == 6) {
              // weekend
              isHoliday = true;
            } else {
              // check holidays
              for (let i = 0; i < options.holidays.length; i++) {
                const currentHoliday = options.holidays[i];
                if (
                  ((currentHoliday.year &&
                    selectedYear === currentHoliday.year) ||
                    !currentHoliday.year) &&
                  dayIndex === currentHoliday.day &&
                  selectedMonth === currentHoliday.month
                ) {
                  isHoliday = true;
                  break;
                }
              }
            }

            if (isHoliday) {
              const idx = tempTD.indexOf('day day-');
              tempTD =
                tempTD.slice(0, idx) + ' bd-holiday ' + tempTD.slice(idx);

              if (options.disableHolidays) {
                const dhidx = tempTD.indexOf('type="button"');
                tempTD =
                  tempTD.slice(0, dhidx) + ' disabled ' + tempTD.slice(dhidx);
              }
            }
          }

          $('#bd-table-days-' + elementID + ' .tr-' + rowIndex).append(tempTD);

          dayIndex++;
        }
      }
      rowIndex++;
    }

    if (options.highlightSelectedDay) {
      var inputValue = inputElement.val();
      inputValue = inputValue.split('/');
      if (inputValue[0] == selectedYear && inputValue[1] == selectedMonth) {
        mainDiv.find('.bd-selected-day').removeClass('bd-selected-day');
        mainDiv
          .find('.day-' + parseInt(inputValue[2]))
          .addClass('bd-selected-day');
      }
    }
  };

  inputElement.parent().on('click', 'button.day', function () {
    var datestr =
      selectedYear +
      '/' +
      selectedMonth +
      '/' +
      $(this)
        .attr('class')
        .split(' ')
        [$(this).attr('class').split(' ').indexOf('day') + 1].split('-')[1];
    if (options.twodigit) {
      datestr = fixDate(datestr);
    }
    inputElement.val(datestr);
    inputElement.trigger('change');
    if (options.closeAfterSelect) {
      isCalClicked = false;
      inputElement.trigger('blur');
    }

    if (options.highlightSelectedDay) {
      mainDiv.find('.bd-selected-day').removeClass('bd-selected-day');
      $(this).addClass('bd-selected-day');
    }
  });

  nextMonth.on('click', function () {
    //console.log("month: " + selectedMonth + ", year: " + selectedYear);
    if (monthDropdown.val() < 12) {
      monthDropdown.val(parseInt(monthDropdown.val()) + 1);
      monthDropdown.trigger('change');
    } else if (
      yearDropdown.val() !=
      yearDropdown[0].options[yearDropdown[0].options.length - 1].value
    ) {
      monthDropdown.val(1);
      monthDropdown.trigger('change');
      yearDropdown.val(parseInt(yearDropdown.val()) + 1);
      yearDropdown.trigger('change');
    }
  });

  prevMonth.on('click', function () {
    if (monthDropdown.val() > 1) {
      monthDropdown.val(parseInt(monthDropdown.val()) - 1);
      monthDropdown.trigger('change');
    } else if (yearDropdown.val() != yearDropdown[0].options[0].value) {
      monthDropdown.val(12);
      monthDropdown.trigger('change');
      yearDropdown.val(parseInt(yearDropdown.val()) - 1);
      yearDropdown.trigger('change');
    }
  });

  if (options.gotoToday) {
    gotoToday.on('click', function () {
      monthDropdown.val(todaysMonth);
      monthDropdown.trigger('change');
      yearDropdown.val(todaysYear);
      yearDropdown.trigger('change');
    });
  }

  drawDays(numberOfDays, dayOfWeekJ);

  // enable bootstrap tooltip if bootstrap is loaded
  if (typeof $().modal == 'function') {
    $('[data-toggle="tooltip"]').tooltip();
  }
}
