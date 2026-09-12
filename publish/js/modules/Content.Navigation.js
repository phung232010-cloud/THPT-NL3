VHV.load("Content.Listing", function () {
  VHV.Content.Navigation = class extends VHV.Content.Listing {
    initEvents() {
      let that = this;
      that
        .$()
        .find("#btn-notice" + that.id)
        .on("click", function () {
          $("#notice" + that.id).loadModule("Content.Listing", {
            layout: that.noticeLayout || "CMS.Admin.noticeDropdown",
            service: that.noticeService || "CMS.Notification.selectAll",
            "options[notYetRead]": that.notYetRead || 0,
            gridModuleParentId: that.id,
            m: that.m || "",
            itemsPerPage: 10,
            menuId: that.menuId || "",
          });
          $(this).find(".badge").addClass("hide");
        });
    }
  };
  VHV.Content.Navigation.parentClass = VHV.Content.Listing;
});
