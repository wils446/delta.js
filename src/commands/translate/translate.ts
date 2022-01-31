import googleTranslate from "@vitalets/google-translate-api";

export default async function translate(text: string, lang = "id"): Promise<string> {
	if (lang.split("-").length > 1) {
		const langSplit = lang.split("-");
		langSplit[1] = langSplit[1].toUpperCase();
		lang = langSplit.join("-");
	}

	const result = await googleTranslate(text, { to: lang });

	return result.text;
}
