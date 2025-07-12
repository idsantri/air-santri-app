const isPrimitiveArray = (arr) => Array.isArray(arr) && arr.every((item) => typeof item !== 'object');

function buildTextError(message) {
	let result = '';
	if (isPrimitiveArray(message)) {
		result = '<ul style="padding:0; padding-left:8px; min-width:250px;max-width:400px">';
		result += message.map((msg) => `<li>${msg}</li>`).join('');
		result += '</ul>';
	} else {
		result = message;
	}
	return result;
}
export { isPrimitiveArray, buildTextError };
