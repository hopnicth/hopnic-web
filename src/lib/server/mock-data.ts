// ================================
// Mock Data for Testing Without Database
// ================================

import type { ProjectWithImages } from './portfolio.service';

export const MOCK_PROJECTS: ProjectWithImages[] = [
	{
		id: 1,
		title: 'ระบบ Automation สำหรับโรงงานผลิตอาหาร',
		subHeader: 'ออกแบบและติดตั้งระบบควบคุมอัตโนมัติแบบครบวงจร',
		bodyContent: `โปรเจคนี้เป็นการออกแบบและติดตั้งระบบ Automation สำหรับโรงงานผลิตอาหารขนาดกลาง

**ขอบเขตงาน:**
- ออกแบบระบบควบคุม PLC
- ติดตั้ง HMI และ SCADA System
- เชื่อมต่อ sensors และ actuators
- ทดสอบและ commissioning

**ผลลัพธ์:**
- เพิ่มประสิทธิภาพการผลิต 35%
- ลดของเสีย 20%
- ลดเวลา downtime 40%

**เทคโนโลยีที่ใช้:**
- Siemens S7-1200 PLC
- Weintek HMI
- Modbus RTU Communication
- VFD Control System`,
		tags: ['Automation', 'PLC & Control'],
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
		images: [
			{
				id: 1,
				imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
				sequenceOrder: 0,
				isCover: true,
				projectId: 1
			},
			{
				id: 2,
				imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
				sequenceOrder: 1,
				isCover: false,
				projectId: 1
			}
		]
	},
	{
		id: 2,
		title: 'ออกแบบเครื่องจักร Custom Machine',
		subHeader: 'เครื่องจักรพิเศษสำหรับงานบรรจุภัณฑ์',
		bodyContent: `ออกแบบและผลิตเครื่องจักรพิเศษตามความต้องการของลูกค้า

**รายละเอียด:**
- ออกแบบ 3D Model ด้วย SolidWorks
- คำนวณโครงสร้างและกำลัง
- เลือกใช้ชิ้นส่วนมาตรฐาน
- ผลิตและประกอบ

**คุณสมบัติ:**
- ความเร็ว: 60 ชิ้น/นาที
- ความแม่นยำ: ±0.1 mm
- ระบบควบคุมอัตโนมัติ
- Safety System ครบถ้วน`,
		tags: ['Design', 'ME'],
		createdAt: new Date('2024-02-10'),
		updatedAt: new Date('2024-02-10'),
		images: [
			{
				id: 3,
				imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
				sequenceOrder: 0,
				isCover: true,
				projectId: 2
			}
		]
	},
	{
		id: 3,
		title: 'ระบบ SCADA สำหรับโรงงานน้ำ',
		subHeader: 'ระบบติดตามและควบคุมการผลิตแบบ Real-time',
		bodyContent: `พัฒนาระบบ SCADA สำหรับโรงงานผลิตน้ำดื่ม

**ฟีเจอร์:**
- Real-time monitoring
- Historical data logging
- Alarm management
- Report generation
- Remote access

**ประโยชน์:**
- ติดตามการผลิตแบบ real-time
- วิเคราะห์ข้อมูลย้อนหลัง
- แจ้งเตือนเมื่อเกิดปัญหา
- สร้างรายงานอัตโนมัติ`,
		tags: ['Automation', 'PLC & Control'],
		createdAt: new Date('2024-03-05'),
		updatedAt: new Date('2024-03-05'),
		images: [
			{
				id: 4,
				imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
				sequenceOrder: 0,
				isCover: true,
				projectId: 3
			},
			{
				id: 5,
				imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
				sequenceOrder: 1,
				isCover: false,
				projectId: 3
			},
			{
				id: 6,
				imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
				sequenceOrder: 2,
				isCover: false,
				projectId: 3
			}
		]
	},
	{
		id: 4,
		title: 'ออกแบบ Conveyor System',
		subHeader: 'ระบบสายพานลำเลียงอัตโนมัติ',
		bodyContent: `ออกแบบและติดตั้งระบบสายพานลำเลียงสำหรับโรงงาน

**รายละเอียด:**
- ความยาว: 50 เมตร
- ความเร็ว: ปรับได้ 0-30 m/min
- น้ำหนักบรรทุก: 500 kg
- ระบบควบคุมด้วย PLC

**ส่วนประกอบ:**
- Belt conveyor
- Motor และ gearbox
- Sensors และ switches
- Control panel`,
		tags: ['Design', 'ME', 'Automation'],
		createdAt: new Date('2024-04-20'),
		updatedAt: new Date('2024-04-20'),
		images: [
			{
				id: 7,
				imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
				sequenceOrder: 0,
				isCover: true,
				projectId: 4
			}
		]
	}
];

export function getMockProjects(): ProjectWithImages[] {
	return MOCK_PROJECTS;
}

export function getMockProjectById(id: number): ProjectWithImages | null {
	return MOCK_PROJECTS.find((p) => p.id === id) || null;
}

export function getMockStats() {
	return {
		totalProjects: MOCK_PROJECTS.length,
		totalImages: MOCK_PROJECTS.reduce((sum, p) => sum + p.images.length, 0),
		thisMonth: 2
	};
}

