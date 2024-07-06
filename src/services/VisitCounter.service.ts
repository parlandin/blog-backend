import Visit from "../models/visit.model";
import SimpleVisit from "../models/simpleVisit.model";
import logger from "../configs/pinoLogger.config";

class VisitCounter {
  async countVisitor(req: any) {
    const isMobile = req.useragent.isMobile;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let visit = await Visit.findOne({ date: { $gte: currentDate } });

    if (!visit) {
      visit = new Visit();
    }

    visit.httpRequests += 1;

    if (!visit.uniqueIPs.includes(req.ip)) {
      visit.uniqueIPs.push(req.ip);
      visit.uniqueVisitors += 1;

      if (isMobile) {
        visit.uniqueMobileVisitors += 1;
      }
    }

    await visit.save();
    logger.debug("global visit count updated.");
    return;
  }

  async getAllVisits() {
    const visits = await Visit.find({});
    const totalVisits = visits.reduce(
      (acc, visit) => acc + visit.httpRequests,
      0
    );
    const totalUniqueVisitors = visits.reduce(
      (acc, visit) => acc + visit.uniqueVisitors,
      0
    );
    const totalNewVisitors = visits.reduce(
      (acc, visit) => acc + visit.newVisitors,
      0
    );
    const totalNewMobileVisitors = visits.reduce(
      (acc, visit) => acc + visit.newMobileVisitors,
      0
    );
    const totalUniqueMobileVisitors = visits.reduce(
      (acc, visit) => acc + visit.uniqueMobileVisitors,
      0
    );

    return {
      totalVisits,
      totalUniqueVisitors,
      totalNewVisitors,
      totalNewMobileVisitors,
      totalUniqueMobileVisitors,
      visitsByDay: visits.map((visit) => ({
        date: visit.date,
        httpRequests: visit.httpRequests,
        uniqueVisitors: visit.uniqueVisitors,
        newVisitors: visit.newVisitors,
        newMobileVisitors: visit.newMobileVisitors,
        uniqueMobileVisitors: visit.uniqueMobileVisitors,
        uniqueIPs: visit.uniqueIPs.length,
      })),
    };
  }

  async getVisitsByDay() {
    const visits = await Visit.find({});
    return visits.map((visit) => ({
      date: visit.date,
      httpRequests: visit.httpRequests,
      uniqueVisitors: visit.uniqueVisitors,
      newVisitors: visit.newVisitors,
      newMobileVisitors: visit.newMobileVisitors,
      uniqueMobileVisitors: visit.uniqueMobileVisitors,
      uniqueIPs: visit.uniqueIPs.length,
    }));
  }

  async simpleCountVisitor(path: string) {
    let visit = await SimpleVisit.findOne({ url: path });

    if (!visit) {
      visit = new SimpleVisit({ url: path });
    }

    visit.visits += 1;

    await visit.save();
    logger.debug("simple visit count updated.");
    return visit.visits;
  }

  async getSimpleVisitByPath(path: string) {
    const visit = await SimpleVisit.findOne({ url: path });
    return visit?.visits || 0;
  }
}

export default new VisitCounter();
