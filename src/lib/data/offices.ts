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
		id: 'hq',
		name: {
			th: 'สำนักงานใหญ่ (Headquarters)',
			en: 'Headquarters'
		},
		address: {
			th: '123/4 หมู่ 5 ต.บางโฉลง อ.บางพลี จ.สมุทรปราการ 10540',
			en: '123/4 Moo 5, Bang Chalong, Bang Phli, Samut Prakan 10540'
		},
		phone: '02-123-4567',
		googleMapUrl: 'https://maps.google.com',
		lineUrl: 'https://line.me/ti/p/~hopnic'
	},
	{
		id: 'branch',
		name: {
			th: 'สาขาย่อย (Branch)',
			en: 'Branch Office'
		},
		address: {
			th: '999/9 นิคมอุตสาหกรรมอมตะซิตี้ ม.6 ต.มาบยางพร อ.ปลวกแดง จ.ระยอง 21140',
			en: '999/9 Amata City Industrial Estate, Moo 6, Mabyangporn, Pluak Daeng, Rayong 21140'
		},
		phone: '038-999-999',
		googleMapUrl: 'https://maps.google.com',
		lineUrl: 'https://line.me/ti/p/~hopnic_branch'
	}
];
