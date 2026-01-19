export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export const siteConfig = {
  name: "Hop Site",
  description: "Corporate Website & Back-office System",
};

export const sampleOffices: Office[] = [
  {
    id: "HQ",
    name: "บริษัท ฮอปนิค จำกัด (สาขาสำนักงานใหญ่)",
    address: "888/8 หมู่ที่ 1 ต.พนมสารคาม อ.พนมสารคาม จ.ฉะเชิงเทรา 24120",
    phone: "095-479-2333",
  },
];
