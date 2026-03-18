type NavigationTab = {
  id: number;
  path: string;
  imgUrl: string;
  name: string;
};

export const navigationTabs: NavigationTab[] = [
  {
    id: 1,
    path: "/tabs/tab1",
    imgUrl: "/resources/face-icon-20.svg",
    name: "MD Codes",
  },
  {
    id: 2,
    path: "/tabs/tab2",
    imgUrl: "/resources/icon-flip-chart.svg",
    name: "Flip Chart",
  },
  {
    id: 3,
    path: "/tabs/tab3",
    imgUrl: "/resources/login.png",
    name: "Profile",
  },
];


