import Visit from "../models/visit.model";
import SimpleVisit from "../models/simpleVisit.model";
import logger from "../configs/pinoLogger.config";
import TotalVisit from "../models/totalVisit.model";
import moment from "moment";

class VisitCounter {
  async countVisitor(req: any) {
    const isMobile = req.useragent.isMobile;
    const currentDate = moment().utc().startOf("day").toDate();

    let visit = await Visit.findOne({ date: { $gte: currentDate } });

    if (!visit) {
      visit = new Visit();
      visit.date = currentDate;
    }

    visit.httpRequests += 1;

    let totalVisit = await TotalVisit.findOne();
    if (!totalVisit) {
      totalVisit = new TotalVisit();
    }
    totalVisit.totalHttpRequests += 1;

    if (!visit.uniqueIPs.includes(req.ip)) {
      const isNewVisitor = !(await Visit.findOne({ uniqueIPs: req.ip }));
      if (isNewVisitor) {
        totalVisit.totalNewVisitors += 1;
        visit.uniqueIPs.push(req.ip);
        visit.uniqueVisitors += 1;
        visit.newVisitors += 1;

        if (isMobile) {
          visit.uniqueMobileVisitors += 1;
          visit.newMobileVisitors += 1;
        }
      }
    }
    await visit.save();
    await totalVisit.save();

    logger.debug("Global visit count updated.");
    return;
  }

  async getAllVisits() {
    const currentDate = moment().subtract(6, "days").toDate();

    const visitsLast6Days = await Visit.find({
      date: { $gte: currentDate },
    })
      .sort({ date: -1 })
      .limit(6)
      .select(
        "date httpRequests uniqueVisitors newVisitors uniqueMobileVisitors newMobileVisitors"
      );

    const totalVisit = await TotalVisit.findOne();

    return {
      visitsLast6Days,
      totalVisit,
    };
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
