export const formatErrors = (errorList: any) => {
	const errorContent = Object.keys(errorList).map((key) => ({
		key,
		value: errorList[key],
	}));

	const formattedErrors: Array<any> = errorContent.map(
		(name) => `${name.key}:\n${name.value.join(", ")}\n\n`
	);
	return formattedErrors.join(", ");
};
