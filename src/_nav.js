export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-home"
    },
    {
      name: "Beneficiary",
      url: "/beneficiary",
      icon: "fa fa-user",
      children: [
        {
          name: "Add beneficiary",
          url: "/beneficiary/beneficiaryList",
          icon: "fa fa-users"
        },
        {
          name: "Bulk upload beneficiary",
          url: "/beneficiary/bulkUploadBeneficiary",
          icon: "fa fa-upload"
        }
      ]
    },

    {
      name: "Training Program",
      url: "/mediaLibrary",
      icon: "fa fa-picture-o"
    },
    {
      name: "Master Data",
      url: "/master",
      icon: "fa fa-asterisk",
      children: [
        {
          name: "Address",
          url: "/master/address",
          icon: "icon-star"
        },
        {
          name: "Roles",
          url: "/master/roles",
          icon: "icon-star"
        },
        // {
        //   name: "Gender",
        //   url: "/master/genders",
        //   icon: "icon-star"
        // },
        // {
        //   name: "Languages",
        //   url: "/dashboard",
        //   icon: "icon-star"
        // },
        {
          name: "Crops List",
          url: "/master/crops",
          icon: "icon-star"
        },
        {
          name: "Contacts",
          url: "/master/contacts",
          icon: "icon-star"
        }
      ]
    },
    {
      name: "Settings",
      url: "/settings",
      icon: "fa fa-cog"
    }
  ]
};