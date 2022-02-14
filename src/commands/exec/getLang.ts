export const getLang = (lang: string) => {
	const languages = [
		{
			name: "python3",
			aliases: ["py", "python"],
			version: "4",
		},
		{
			name: "c",
			aliases: ["c"],
			version: "5",
		},
		{
			name: "cpp",
			aliases: ["c++", "cpp"],
			version: "5",
		},
		{
			name: "php",
			aliases: ["php"],
			version: "4",
		},
		{
			name: "java",
			aliases: ["java"],
			version: "4",
		},
		{
			name: "go",
			aliases: ["go", "golang"],
			version: "4",
		},
		{
			name: "nodejs",
			aliases: ["js", "javascript"],
			version: "4",
		},
	];

	return languages.find((l) => l.aliases.includes(lang) || []);
};
