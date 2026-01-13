export interface Office {
	id: string;
	name: string;
	address: string;
	phone: string;
}

export const siteConfig = {
	name: 'Hop Site',
	description: 'Corporate Website & Back-office System'
};

export const sampleOffices: Office[] = [
	{
		id: 'HQ',
		name: 'Headquarters',
		address: '123 Hop Street, Bangkok',
		phone: '02-123-4567'
	}
];
