import { Request, Response } from 'express';
import { LESSONS } from './db-data';
import { setTimeout } from 'timers';

export function searchLessons(req: Request, res: Response) {
	const queryParams = req.query;
	const courseId = queryParams.courseId,
		filter = queryParams.filter || '',
		sortOrder = queryParams.sortOrder || 'asc',
		pageNumber = parseInt(queryParams.pageNumber as string, 10) || 0,
		pageSize = parseInt(queryParams.pageSize as string, 10) || 3;
	let lessons;
	if (courseId) {
		lessons = Object.values(LESSONS).filter(lesson => lesson.courseId === parseInt(courseId as string, 10)).sort((l1, l2) => l1.id - l2.id);
	} else {
		lessons = Object.values(LESSONS);
	}
	if (filter) {
		if (typeof filter === 'string') {
			lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
		}
	}
	if (sortOrder === 'desc') {
		lessons = lessons.reverse();
	}
	const initialPos = pageNumber * pageSize;
	const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);
	setTimeout(() => {
		res.status(200).json({payload: lessonsPage});
	}, 1000);
}
