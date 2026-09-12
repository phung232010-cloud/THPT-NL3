VHV.Common.Statistic.Client = class {
  static visitedObjects = {};
  static init() {
    if (window.localStorage) {
      let st = window.localStorage.getItem("vhvVisitedObjects");
      if (st) {
        this.visitedObjects = JSON.parse(st);
      }
    }
  }
  static save() {
    if (window.localStorage) {
      window.localStorage.setItem(
        "vhvVisitedObjects",
        JSON.stringify(this.visitedObjects)
      );
    }
  }
  static request() {
    this.init();
    let type = "System",
      itemId = "",
      timeLimit = 10,
      time = Math.round(new Date().getTime() / 1000),
      request = false,
      matches =
        /^(Article|Product|Post|Courseware|DynamicLink|Book|File)\.([\w.]+\.)?detail/.exec(
          VHV.pageId
        );
    if (matches && VHV.itemId) {
      type = matches[1];
      itemId = VHV.itemId;
    } else if (
      VHV.pageId.match(/^(Article|Product)\.[\w.]+\.list/) &&
      VHV.itemId &&
      !isNaN(VHV.itemId)
    ) {
      type = "Category";
      itemId = VHV.itemId;
    } else if (VHV.pageId.match(/^Group\./)) {
      type = "Group";
      itemId = VHV.groupId;
    } else if (
      VHV.pageId.match(/^Extra\.SuperApp\.Home\.App\.detail/) &&
      VHV.itemId
    ) {
      type = "Group";
      itemId = VHV.itemId;
    } else if (
      (VHV.pageId.match(/^Software\.Library\.Home\.Book\.detail/) ||
        VHV.pageId.match(/^Software\.Library\.Paper\.Home\.Book\.detail/)) &&
      VHV.itemId
    ) {
      type = "Book";
      itemId = VHV.itemId;
    } else if (
      VHV.pageId.match(/^LMS\.K12\.ContentHub\.Home\.TrainingModule\.detail/) &&
      VHV.itemId
    ) {
      type = "TrainingModule";
      itemId = VHV.itemId;
    } else if (
      VHV.pageId.match(/^Extra\.Reflect\.Home\.detail/) &&
      VHV.itemId
    ) {
      type = "Reflect";
      itemId = VHV.itemId;
    } else if (
      VHV.pageId.match(/^Extra\.Reflect\.Home\.Article\.detail/) &&
      VHV.itemId
    ) {
      type = "Article";
      itemId = VHV.itemId;
    } else if (
      VHV.pageId.match(/^Project\.LawLibrary\.Home\.LegalDocument\.detail/) &&
      VHV.itemId
    ) {
      type = "File";
      itemId = VHV.itemId;
    } else if (
      VHV.pageId.match(/^Project\.SVS\.Account\.Post\.JobNews\.detail/) &&
      VHV.itemId
    ) {
      type = "Post";
      itemId = VHV.itemId;
    } else if (
      (VHV.pageId.match(/^LMS\.Course\.CourseDetail\.Student/) ||
        VHV.pageId.match(/^Course\.Training\.detail/)) &&
      VHV.itemId
    ) {
      type = "Course";
      itemId = VHV.itemId;
    }
    if (type === "System") {
      if (
        !this.visitedObjects.System ||
        this.visitedObjects.System < time - 180
      ) {
        this.visitedObjects.System = time;
        request = true;
      }
    } else {
      if (!this.visitedObjects[type]) {
        this.visitedObjects[type] = {};
      }
      if (
        !this.visitedObjects[type][itemId] ||
        this.visitedObjects[type][itemId] < time - 3600
      ) {
        request = true;
        this.visitedObjects[type][itemId] = time;
      }
    }
    if (request) {
      let lastItems = [];
      if (["Product", "Book"].indexOf(type) !== -1) {
        let objects = [];
        for (let i in this.visitedObjects[type]) {
          let itemTime = this.visitedObjects[type][i];
          if (i !== itemId && itemTime > time - 120) {
            objects.push([i, itemTime]);
          }
        }
        objects.sort(function (a, b) {
          return b[1] - a[1];
        });
        for (let i in objects) {
          lastItems.push(objects[i][0]);
          if (lastItems.length > 2) {
            break;
          }
        }
      }
      this.requestService(type, itemId, lastItems.join(","));
    }
    if (
      type !== "System" &&
      (!this.visitedObjects.System ||
        this.visitedObjects.System < time - parseInt(timeLimit))
    ) {
      this.visitedObjects.System = time;
      this.requestService("System", "");
    }
  }
  static requestService(type, itemId, lastItems) {
    let that = this;
    setTimeout(function () {
      VHV.Model("Common.Statistic.Client.request")(
        $.extend(
          {
            type: type,
            itemId: itemId,
            deviceType: that.getDeviceType(),
            osType: that.getOSType(),
          },
          ["Product", "Book"].indexOf(type) !== -1 && lastItems
            ? { lastItems: lastItems }
            : {},
          VHV.itemOriginSite ? { originSite: VHV.itemOriginSite } : {}
        ),
        function () {
          that.save();
        }
      );
    }, 500);
  }
  static getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  }
  static getOSType() {
    let platform = "unknow";
    if (
      typeof navigator?.userAgentData !== "undefined" &&
      navigator?.userAgentData != null
    ) {
      platform = navigator?.userAgentData?.platform;
    } else if (typeof navigator?.userAgent !== "undefined") {
      if (/android/.test(navigator?.userAgent.toLowerCase())) {
        platform = "android";
      } else if (/ipad/.test(navigator?.userAgent.toLowerCase())) {
        platform = "ipad";
      } else if (/iphone/.test(navigator?.userAgent.toLowerCase())) {
        platform = "iphone";
      } else if (/ipod/.test(navigator?.userAgent.toLowerCase())) {
        platform = "ipod";
      } else if (/win/.test(navigator?.userAgent.toLowerCase())) {
        platform = "windows";
      } else if (/mac/.test(navigator?.userAgent.toLowerCase())) {
        platform = "mac";
      }
    }
    if (["iphone", "ipad", "ipod"].indexOf(platform.toLowerCase()) !== -1) {
      return "iOS";
    }
    if (/win/.test(platform.toLowerCase())) {
      return "windows";
    }
    if (/android/.test(platform.toLowerCase())) {
      return "android";
    }
    return "other";
  }
};
