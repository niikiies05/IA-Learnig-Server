import OpenAI from 'openai-api';

let openai: OpenAI;

if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI(process.env.OPENAI_API_KEY);
} else {
    console.error('OPENAI_API_KEY is not defined');
}

export const getModuleRecommendations = async (
    interests: string[]
): Promise<string[]> => {
    // Build the prompt for GPT-3 based on the student's interests
    const prompt = `Given a student with the following interests: ${interests.join(
        ', '
    )}, suggest relevant training modules:`;

    try {
        const response = await openai.complete({
            engine: 'davinci-codex',
            prompt,
            maxTokens: 100,
            n: 1,
            stop: ['\n'],
            temperature: 0.5,
        });

        // Extract recommendations from GPT-3 response
        const recommendations = response.data.choices[0].text
            .trim()
            .split('\n')
            .map((recommendation) => recommendation.trim());

        return recommendations;
    } catch (error: any) {
        console.error('Error in GPT-3 API call:', error);
        return [];
    }
};
