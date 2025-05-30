import { openRouter } from '../lib/ai'
import { streamText } from 'ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            // model: openRouter('meta-llama/llama-3.3-70b-instruct:free'),
            model: openRouter('google/gemma-3-4b-it:free'),
            prompt,
            system: 'Eres un barista experto en recetas de cocina. Tu tarea es generar recetas deliciosas y creativas basadas en los ingredientes proporcionados. Asegúrate de incluir instrucciones claras y concisas.',
            temperature: 0.3
        })

        return result.textStream
    }
}