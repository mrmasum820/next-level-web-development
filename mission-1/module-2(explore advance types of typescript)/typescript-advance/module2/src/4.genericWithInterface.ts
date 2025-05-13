// Interface Generic

type Developer<T> = {
  name: string;
  computer: {
    name: string;
    model: string;
    processor: string;
  };
  smartWatch: T;
};

type EmledWatch = {
  name: string;
  display: string;
};

const poorDeveloper: Developer<EmledWatch> = {
  name: "MR Masum",
  computer: {
    name: "HP",
    model: "cori5",
    processor: "Emuled",
  },
  smartWatch: {
    name: "Intel",
    display: "Emuled",
  },
};

interface AppleWatch {
  name: string;
  display: string;
  heartBeatCheck: boolean;
  walkingCheck: boolean;
}

const richDeveloper: Developer<AppleWatch> = {
  name: "Pranto",
  computer: {
    name: "Apple",
    model: "cori7",
    processor: "Gorilla",
  },
  smartWatch: {
    name: "Apple Watch",
    display: "Gorilla",
    heartBeatCheck: true,
    walkingCheck: true,
  },
};
