import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

function formatDate(date, formatString = 'yyyy-MM-dd HH:mm:ss') {
	try {
		const parsedDate = new Date(date);

		// Check if the date is valid
		if (!isValid(parsedDate)) {
			return 'Invalid Date';
		}

		// Check if the format string is valid by attempting to format the date
		const formattedDate = format(parsedDate, formatString, {
			locale: id,
		});

		return formattedDate;
	} catch (error) {
		console.error(error);
		return 'Invalid Format'; // Handle invalid format error
	}
}

export default formatDate;
