const fs = require('fs');
const yaml = require('yaml');
const { parseISO, format } = require('date-fns');
const { TZDate } = require('@date-fns/tz');

function parseDateTime(raw, timezone) {
  if (raw instanceof Date) {
    return new TZDate(raw, timezone);
  }
  if (typeof raw === 'string') {
    const normalized = raw.replace(' ', 'T');
    return new TZDate(parseISO(normalized), timezone);
  }
  return new TZDate(raw, timezone);
}

module.exports = function(config, timezone = 'UTC') {
  config.addCollection("sessionsByDateAndTime", function(collectionApi) {
    let sessions = collectionApi.getFilteredByGlob("src/_content/schedule/{tutorials,talks,sprints}/*.md");

    if (sessions.length === 0) return [];

    const manualContent = fs.readFileSync('src/_content/schedule/manual.yaml', 'utf8');
    const manualData = yaml.parse(manualContent);
    sessions = sessions.concat(manualData);

    sessions = sessions.filter(session => !(session.data?.hidden || session.hidden));

    const sessionsByDateAndTime = sessions.reduce((acc, session) => {
      const sessionData = session.data || session;

      const startRaw = sessionData.start_datetime;
      const endRaw = sessionData.end_datetime;

      const startDateObj = parseDateTime(startRaw, timezone);
      const endDateObj = parseDateTime(endRaw, timezone);

      const startDate = format(startDateObj, 'yyyy-MM-dd');
      const start = format(startDateObj, "yyyy-MM-dd'T'HH:mm:ssXXX");
      const end = format(endDateObj, "yyyy-MM-dd'T'HH:mm:ssXXX");

      if (!acc[startDate]) {
        acc[startDate] = [];
      }

      const slotKey = `${start}-${end}`;
      let slot = acc[startDate].find(slot => `${slot.start}-${slot.end}` === slotKey);

      if (!slot) {
        slot = {
          start: start,
          end: end,
          sessions: []
        };
        acc[startDate].push(slot);
      }

      slot.sessions.push(sessionData);

      return acc;
    }, {});

    const sortedSessionsByDateAndTime = Object.keys(sessionsByDateAndTime)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((sortedAcc, date) => {
        sortedAcc[date] = sessionsByDateAndTime[date];
        return sortedAcc;
      }, {});

    for (let date in sortedSessionsByDateAndTime) {
      sortedSessionsByDateAndTime[date].forEach(slot => {
        slot.sessions.sort((a, b) => {
          const aStart = parseDateTime(a.start_datetime, timezone);
          const bStart = parseDateTime(b.start_datetime, timezone);

          const startComparison = aStart - bStart;
          if (startComparison !== 0) return startComparison;

          const aEnd = parseDateTime(a.end_datetime, timezone);
          const bEnd = parseDateTime(b.end_datetime, timezone);

          const endComparison = aEnd - bEnd;
          if (endComparison !== 0) return endComparison;

          return a.track.localeCompare(b.track);
        });
      });

      sortedSessionsByDateAndTime[date].sort((a, b) => {
        const aStart = typeof a.start === 'string' ? parseISO(a.start) : a.start;
        const bStart = typeof b.start === 'string' ? parseISO(b.start) : b.start;
        const startComparison = aStart - bStart;
        if (startComparison !== 0) return startComparison;

        const aEnd = typeof a.end === 'string' ? parseISO(a.end) : a.end;
        const bEnd = typeof b.end === 'string' ? parseISO(b.end) : b.end;
        return aEnd - bEnd;
      });
    }

    return sortedSessionsByDateAndTime;
  });

  config.addCollection("talks", function(collectionApi) {
    let sessions = collectionApi.getFilteredByGlob("src/_content/schedule/talks/*.md");
    sessions = sessions.filter(session => !(session.data?.hidden || session.hidden));
    sessions.sort((a, b) => {
      const aRaw = a.data?.start_datetime || a.start_datetime;
      const bRaw = b.data?.start_datetime || b.start_datetime;

      const aDate = parseDateTime(aRaw, timezone);
      const bDate = parseDateTime(bRaw, timezone);

      return aDate - bDate;
    });

    return sessions;
  });

  // Uncomment if needed in future
  // config.addCollection("tutorials", function(collectionApi) {
  //   let sessions = collectionApi.getFilteredByGlob("src/_content/schedule/tutorials/*.md");
  //   sessions = sessions.filter(session => !(session.data?.hidden || session.hidden));
  //   sessions.sort((a, b) => {
  //     const aRaw = a.data?.start_datetime || a.start_datetime;
  //     const bRaw = b.data?.start_datetime || b.start_datetime;
  //     const aDate = typeof aRaw === 'string' ? parseISO(aRaw) : aRaw;
  //     const bDate = typeof bRaw === 'string' ? parseISO(bRaw) : bRaw;
  //     return aDate - bDate;
  //   });

  //   return sessions;
  // });
};
