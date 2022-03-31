module.exports = {
  // The app title set
  title: "一体化操作安全管控平台",

  // Navigation data
  navigator: [
    {
      title: "变电操作",
      icon: "orders-o",
      activeIcon: "",
      name: "substationCheck",
      path: "/substationCheck",
      meta: { order: 1 }
    },
    {
      title: "厂站许可",
      icon: "comment-o",
      activeIcon: "",
      name: "permissiongd",
      path: "/permissiongd",
      meta: { order: 2 }
    },
    {
      title: "调度操作",
      icon: "description",
      activeIcon: "",
      name: "schedulingPar",
      path: "/schedulingPar",
      meta: { order: 3 }
    },
    {
      title: "输电安全",
      icon: "records",
      activeIcon: "",
      name: "transmissionSecurity",
      path: "/transmissionSecurity",
      meta: { order: 4 }
    },
    {
      title: "调度关联",
      icon: "guide-o",
      activeIcon: "",
      name: "associatedCheck",
      path: "/associatedCheck",
      meta: { order: 5 }
    },
  ]
}