export interface LocalizedString {
  th: string;
  en: string;
}

export interface Office {
  id: string;
  name: LocalizedString;
  address: LocalizedString;
  phone: string;
  googleMapUrl: string;
  lineUrl: string;
}

export const offices: Office[] = [
  {
    id: "hq",
    name: {
      th: "บริษัท ฮอปนิค จำกัด (สาขาสำนักงานใหญ่)",
      en: "HOPNIC CO., LTD. - Headquarters",
    },
    address: {
      th: "888/8 หมู่ที่ 1 ต.พนมสารคาม อ.พนมสารคาม จ.ฉะเชิงเทรา 24120",
      en: "888/8, Village No.1, Phanom Sarakham, Phanom Sarakham, Chachoengsao 24120",
    },
    phone: "095-479-2333",
    googleMapUrl: "https://share.google/IMY7X0D19mlKgSFhQ",
    lineUrl: "https://lin.ee/BXNCZQB",
  },
  {
    id: "branch",
    name: {
      th: "บริษัท ฮอปนิค จำกัด (ดีไซน์ ออฟฟิศ)",
      en: "HOPNIC CO., LTD. - Design Office",
    },
    address: {
      th: "ห้อง 1508 ชั้นที่ 5 เลขที่ 2 ซอยลาดกระบัง 1 ถนนอ่อนนุช แขวงลาดกระบัง, เขตลาดกระบัง, กรุงเทพฯ 10520",
      en: "Room 1508, 5th Floor, 2 Soi Lat Krabang 1, On Nut Rd., Lat Krabang, Bangkok 10520",
    },
    phone: "095-479-2333",
    googleMapUrl: "https://share.google/BJBh7FLor4E7X7D42",
    lineUrl: "https://lin.ee/BXNCZQB",
  },
];
